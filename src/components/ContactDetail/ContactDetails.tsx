import React, { useEffect, useState, useRef } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);

    // Reference for the horizontal scroll container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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


  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const nextSlide = () => {
    if (contacts) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % contacts.length);
    }
  };

  const prevSlide = () => {
    if (contacts) {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + contacts.length) % contacts.length
      );
    }
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


  if (!contacts || contacts.length === 0) {
    return <div>No contacts found.</div>;
  }

      // Get the indices for the three cards to display
  const prevIndex = (currentSlide - 1 + contacts.length) % contacts.length;
  const nextIndex = (currentSlide + 1) % contacts.length;

  return (


    <div className="slider-container">
        {successMessage && (
          <div className="success-message-container">
            <p className="success-message">{successMessage}</p>
          </div>
        )}
      <section id="slider" className="slider">
        <div className="carousel">
          <div className="card prev">
            <div className='card-header-contact-detail'>
             <h2>{contacts[prevIndex].name}</h2>
             <i
            className="bi bi-person-fill-slash delete-icon icon-large"
            onClick={() => handleDeleteClick(contacts[prevIndex])}
            title="Delete Contact"
          ></i>
            </div>
            <p><strong>Phone:</strong> {contacts[prevIndex].phone}</p>
            <p><strong>Email:</strong> {contacts[prevIndex].email}</p>
            <p><strong>Address:</strong> {contacts[prevIndex].address}</p>
            <p><strong>Job Title:</strong> {contacts[prevIndex].jobTitle}</p>
            <p><strong>Company:</strong> {contacts[prevIndex].company}</p>
            <p><strong>Date of Birth:</strong> {contacts[prevIndex].dob}</p>
            <p><strong>Quote to live by:</strong> {contacts[prevIndex].quote}</p>
          </div>
          <div className="card active">
          <div className='card-header-contact-detail'>
            <h2>{contacts[currentSlide].name}</h2>
            <i
            className="bi bi-person-fill-slash delete-icon icon-large"
            onClick={() => handleDeleteClick(contacts[currentSlide])}
            title="Delete Contact"
          ></i>
            </div>
            <p><strong>Phone:</strong> {contacts[currentSlide].phone}</p>
            <p><strong>Email:</strong> {contacts[currentSlide].email}</p>
            <p><strong>Address:</strong> {contacts[currentSlide].address}</p>
            <p><strong>Job Title:</strong> {contacts[currentSlide].jobTitle}</p>
            <p><strong>Company:</strong> {contacts[currentSlide].company}</p>
            <p><strong>Date of Birth:</strong> {contacts[currentSlide].dob}</p>
            <p><strong>Quote to live by:</strong> {contacts[currentSlide].quote}</p>
          </div>
          <div className="card next">
            <div className='card-header-contact-detail'>

              <h2>{contacts[nextIndex].name}</h2>
              <i
              className="bi bi-person-fill-slash delete-icon icon-large"
              onClick={() => handleDeleteClick(contacts[nextIndex])}
              title="Delete Contact"
              ></i>
            </div>
            <p><strong>Phone:</strong> {contacts[nextIndex].phone}</p>
            <p><strong>Email:</strong> {contacts[nextIndex].email}</p>
            <p><strong>Address:</strong> {contacts[nextIndex].address}</p>
            <p><strong>Job Title:</strong> {contacts[nextIndex].jobTitle}</p>
            <p><strong>Company:</strong> {contacts[nextIndex].company}</p>
            <p><strong>Date of Birth:</strong> {contacts[nextIndex].dob}</p>
            <p><strong>Quote to live by:</strong> {contacts[nextIndex].quote}</p>
          </div>
        </div>

        <button className="nav-button left" onClick={prevSlide} aria-label="Previous Slide">
          &#10094;
        </button>
        <button className="nav-button right" onClick={nextSlide} aria-label="Next Slide">
          &#10095;
        </button>
      </section>

      {isModalVisible && contactToDelete && (
          <DeleteConfirmationModal
            contactName={contactToDelete.name}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

    </div>
  );
};

export default ContactDetails;