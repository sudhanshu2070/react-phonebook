import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ContactDetails.css'; // Import the CSS file

interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  jobTitle: string;
  company: string;
  dob: string;
}

const ContactDetails: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  //const [contact, setContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact []| null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
       console.log("Fetching data...");

       let response;
       
       if (name) {
         console.log("Fetching contact by name:", name);
         response = await axios.get(`http://localhost:5000/api/contacts?name=${name}`);
       } 
       else if(name === '' || name === null) {
         console.log("Fetching all contacts");
         response = await axios.get('http://localhost:5000/api/contacts');
       }
       else{
        response = await axios.get('http://localhost:5000/api/contacts');
       }

      if (response.data.length > 0) {
          setContacts(response.data); // Assuming response is an array
          setError(null); // Clear any previous errors
        } 
        else 
        {
          setError('No contact found.');
        }
      } 
      catch (error) {
        setError('Error fetching contact details.');
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContact();
  }, [name]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!contacts) {
    return <p>Loading...</p>;
  }


  const renderContactCard = (contact:any)  =>(   
    <div className="card">
    <div className="card-header">
      <h2>{contact.name}</h2>
    </div>
    <div className="card-body">
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Address:</strong> {contact.address}</p>
      <p><strong>Job Title:</strong> {contact.jobTitle}</p>
      <p><strong>Company:</strong> {contact.company}</p>
      <p><strong>Date of Birth:</strong> {contact.dob}</p>
    </div>
  </div>
  );

  if (contacts.length > 0) {
    return <div>{contacts.map(renderContactCard)}</div>;
  }

  return <div>No contacts found.</div>;
};

export default ContactDetails;