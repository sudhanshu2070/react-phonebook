import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddContact.css'; // Import the cool CSS

const AddContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    jobTitle: '',
    company: '',
    dob: ''
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/contacts', formData);
      console.log("Added");
      setSuccessMessage('Contact added successfully.');
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/'); // Navigate after hiding the message
      }, 1000); // Delay navigation for 1 seconds to allow message to be visible
    } catch (error) {
      console.error("There was an error adding the contact!", error);
      setError('Failed to add the contact.');
    }
  };
  

  return (
    <div className="add-contact-container">
      <h1>Add Contact</h1>
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      </div>
      <div className="input-group">
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      </div>
      <div className="input-group">
        <label htmlFor="address">Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      </div>
      <div className="input-group">
        <label htmlFor="jobTitle">Job Title</label>
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
      </div>
      <div className="input-group">
        <label htmlFor="company">Company</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
      </div>
      <div className="input-group">
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
      </div>
      <button onClick={handleSubmit}>Add Contact</button>

      {/* Display Success Message */}
      {successMessage && (
        <div className="success-message-container">
          <p className="success-message">{successMessage}</p>
        </div>
      )}

      {/* Render Error Message */}
      {error && <p>{error}</p>}

    </div>
  );
};

export default AddContact;