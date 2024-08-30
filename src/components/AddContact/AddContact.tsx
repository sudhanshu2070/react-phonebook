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
    dob: '',
    quote:''
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const image = "./images/ben-bouvier-farrell.jpg"; //public\images\ben-bouvier-farrell.jpg
  const bgdImgContactDtl = "./images/philippe-mignot.jpg" //public\images\ben-bouvier-farrell.jpg
  // const bgdImgContactTitle = "./images/tim-navis.jpg" //public\images\ben-bouvier-farrell.jpg

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

    <div className="page-background"  style={{backgroundImage:`url(${bgdImgContactDtl})`}} >

    <div className="add-contact-container" style={{ backgroundImage:`url(${image})` }}>

      <h1 className="add-contact-title">Add New Contact</h1>

        <div className="add-contact-input-group">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        </div>

        <div className="add-contact-input-group">
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        </div>

        <div className="add-contact-input-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
        </div>
          
        <div className='add-contact-input-row'>

        <div className="add-contact-input-group">
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
        </div>

        <div className="add-contact-input-group">
          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
        </div>
        
        </div>

        <div className="add-contact-input-group">
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Home Address" />
        </div>

        <div className="add-contact-input-group">
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
        </div>

        <div className="add-contact-input-group">
          <input type="text" name="quote" value={formData.quote} onChange={handleChange} placeholder="Quote to live by..." />
        </div>

        <button onClick={handleSubmit} className="add-contact-button">
          Add Contact
        </button>

      {successMessage && (
        <div className="add-contact-success-message-container">
          <p className="add-contact-success-message">{successMessage}</p>
        </div>
      )}

      {error && <p className="add-contact-error-message">{error}</p>}
    </div>

    </div>
  );
};

export default AddContact;