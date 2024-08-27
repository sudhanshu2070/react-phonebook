import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

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
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


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



  const deleteContact = async (id: string) => {

    // const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
  
    // if (!confirmDelete) {
    //   return; // If the user cancels, exit the function
    // }

    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts(contacts?.filter(contact => contact._id !== id) || null);
      setIsModalVisible(false);
       setSuccessMessage('Contact deleted successfully.');
       setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Failed to delete the contact.');
    }
  };


    const handleDeleteClick = (contact: Contact) => {
    setContactToDelete(contact);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete._id);
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setContactToDelete(null);
  };


  if (error) {
    return <p>{error}</p>;
  }

  if (!contacts) {
    return <p>Loading...</p>;
  }


  const renderContactCard = (contact:Contact)  =>(   
    <div className="card" key={contact._id}>
    <div className="card-header">
      <h2>{contact.name}</h2>
      <i
        className="bi bi-person-fill-slash delete-icon icon-large"
        //onClick={() => deleteContact(contact._id)}
         //onClick={() => setContactToDelete(contact._id)}
         onClick={() => handleDeleteClick(contact)}
        title="Delete Contact"
      ></i>
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
    return <div>
   
   {successMessage && (
        <div className="success-message-container">
          <p className="success-message">{successMessage}</p>
        </div>
      )}

    {contacts.map(renderContactCard)}
      {isModalVisible && contactToDelete && (
        <DeleteConfirmationModal
          contactName={contactToDelete.name} // Pass contactName here
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>;
  }

  return <div>No contacts found.</div>;

};

export default ContactDetails;