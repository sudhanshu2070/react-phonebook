import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import axios from 'axios';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState<string>(''); // State to hold the entered contact name

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  const handleViewContacts = async () => {
    try {
      // Fetch all contacts
      console.log("contactName for all:",contactName);

      const response = await axios.get('http://localhost:5000/api/contacts');
      console.log("all data:", response.data);

    } catch (error) {
      console.error("There was an error fetching the contacts!", error);
    }
    navigate('/contact/'); // Navigates to the page displaying all contacts
  };

  const handleViewContactDetails = async () => {
    try {
      if (contactName.trim()) {
        console.log("contactName1:",contactName);
        const response = await axios.get(`http://localhost:5000/api/contacts?name=${contactName}`);
        console.log('Contact details:', response.data);
        // Navigate to the contact details page
        navigate(`/contact/${contactName}`);
      } else {
        navigate('/contact/');
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  };

 
  return (
    <div className="home-container">
      <h1>Welcome to the Contact Book</h1>
      <div className="button-container">
        <button className="home-btn" onClick={handleAddContact}>
          Add Contact
        </button>
        <div className="view-contact-section">
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Enter Contact Name"
            className="contact-name-input"
          />
          <button className="home-btn" onClick={handleViewContactDetails}>
            View Contact Details
          </button>
        </div>
        <button className="home-btn" onClick={handleViewContacts}>
          View All Contacts
        </button>
      </div>
    </div>
  );
};

export default Home;