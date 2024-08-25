import React from 'react';
import { useParams } from 'react-router-dom';
import './ContactDetails.css'; // Import the CSS file

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  jobTitle: string;
  company: string;
  dob: string;
}

interface ContactDetailsProps {
  contacts: Contact[];
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contacts }) => {
  const { id } = useParams<{ id?: string }>();

  if (id) {
    const contactId = parseInt(id, 10);
    const contact = contacts.find(contact => contact.id === contactId);

    if (contact) {
      return (
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
    } else {
      return <p>No contact found.</p>;
    }
  } else {
    return (
      <div>
        <h2>All Contacts</h2>
        {contacts.length > 0 ? (
          contacts.map(contact => (
            <div key={contact.id} className="card">
              <h3>{contact.name}</h3>
              <p>Phone: {contact.phone}</p>
              <p>Email: {contact.email}</p>
              <p>Address: {contact.address}</p>
              <p>Job Title: {contact.jobTitle}</p>
              <p>Company: {contact.company}</p>
              <p>Date of Birth: {contact.dob}</p>
            </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </div>
    );
  }
};

export default ContactDetails;