import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
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
  quote:string;
}

const ContactDetails: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  //const [contact, setContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact []| null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() => {
    const fetchContact = async () => {
      try {
       let response;
       
       if (name) {
         response = await axios.get(`http://localhost:5000/api/contacts?name=${name}`);
       } 
       else if(name === '' || name === null) {
         response = await axios.get('http://localhost:5000/api/contacts');
       }
       else{
        response = await axios.get('http://localhost:5000/api/contacts');
       }

      if (response.data.length > 0) {
          setContacts(response.data); // If the response is an array
          setError(null); // Clearing any previous errors
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
      finally{
        setLoading(false); // Set loading to false after the fetch is complete
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


  if (loading) {
    // Rendering multiple skeleton loaders while loading
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }


  if (error) {
    return <p>{error}</p>;
  }

  if (contacts && contacts.length > 0) {
    return (
      <div>
        {successMessage && (
          <div className="success-message-container">
            <p className="success-message">{successMessage}</p>
          </div>
        )}

        {contacts.map((contact,index) => (
          <div className="card" key={contact._id}>

            <div className="card-header">
              <h2>{contact.name}</h2>
              <i
                className="bi bi-person-fill-slash delete-icon icon-large"
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
              <p><strong>Quote to live by:</strong> {contact.quote}</p>
            </div>
          </div>
        ))}

        {isModalVisible && contactToDelete && (
          <DeleteConfirmationModal
            contactName={contactToDelete.name}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    );
  }

  return <div>No contacts found.</div>;
};

export default ContactDetails;