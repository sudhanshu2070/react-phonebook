import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch, faAddressBook } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './Home.css'; // Import the CSS file


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState<string>(''); // State to hold the entered contact name

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  const handleViewContacts = () => {
    const trimmedName = contactName.trim();
    if (trimmedName) {
      navigate(`/contact/${trimmedName}`);
    } else {
      navigate('/contact/');
    }
  };

 
  return (
  
  <div className="home-container">

  <div className="background-layer layer-one"></div>
  <div className="background-layer layer-two"></div>
  <div className="background-layer layer-three"></div>
  <div className="background-layer layer-four"></div>

      <h1>▓▒░ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗧𝗲𝗹𝗲𝗽𝗵𝗼𝗻𝗲 𝗗𝗶𝗿𝗲𝗰𝘁𝗼𝗿𝘆 ░▒▓</h1>
      <div className="button-container">
        <div className="left-container">
          <button className="home-btn" onClick={handleAddContact}>
          <FontAwesomeIcon icon={faUserPlus} /> Add Contact
          </button>
        </div>
        <div className="view-contact-section" >
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder = "Enter Contact Name to search"
            className="contact-name-input"
          />
          <button className="home-btn" onClick={handleViewContacts}>
          <FontAwesomeIcon icon={faSearch} /> View Contact Details
          </button>
        </div>
        <div className="bottom-container">
          <button className="home-btn" onClick={handleViewContacts}>
          <FontAwesomeIcon icon={faAddressBook} /> View All Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;