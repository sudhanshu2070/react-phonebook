import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [contactId, setContactId] = useState<string>(''); // State to hold the entered contact ID

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  const handleViewContacts = () => {
    navigate('/contact/'); // Navigates to the page displaying all contacts
  };

  const handleViewContactDetails = () => {
    if (contactId.trim()) {
      navigate(`/contact/${contactId}`); // Navigates to the specific contact details
    } else {
      navigate('/contact/');
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
            type="number"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            placeholder="Enter Contact ID"
            className="contact-id-input"
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