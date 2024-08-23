import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [contactId, setContactId] = useState<string>(''); // Default to '' to display all contacts initially

  return (
    <div className="container">
      <h1 className="heading">Welcome to the Contact Book</h1>
      <div>
        <button className="button" onClick={() => navigate('/add-contact')}>Add Contact</button>
        <div className="input-container">
          <input
            className="input-field"
            type="number"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            placeholder="Enter Contact ID"
          />
          <button className="button" onClick={() => navigate(`/contact/${contactId}`)}>View Contact Details</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
