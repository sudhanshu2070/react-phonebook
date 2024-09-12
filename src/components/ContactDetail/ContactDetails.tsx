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

  const [currentSlide, setCurrentSlide] = useState(0);

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
       setTimeout(() => setSuccessMessage(null), 3000); // Hiding message after 3 seconds
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
    if (contactToDelete && contacts) {
      deleteContact(contactToDelete._id);

    // Updating the contacts array after the deletion
    const updatedContacts = contacts.filter((c) => c._id !== contactToDelete._id);
    setContacts(updatedContacts);

    if (updatedContacts.length === 0) {
      // If no contacts are left
      setCurrentSlide(0);
    } else if (currentSlide >= updatedContacts.length) {
      // If we're at the last contact, moving to the last available contact
      setCurrentSlide(updatedContacts.length - 1);
    } else {
      // Otherwise, keeping the current index or moving to the next slide
      setCurrentSlide((prevSlide) => prevSlide % updatedContacts.length);
    }
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setContactToDelete(null);
  };


  const nextSlide = () => {
    if (contacts && contacts.length > 0) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % contacts.length);
    }
  };

  const prevSlide = () => {
    if (contacts && contacts.length > 0) {
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

  // using url(${contactDtlBgImg}) inside the style attribute in JSX,
  // the relative path like ./images/tim-navis.jpg is interpreted relative to the JavaScript file location,
  // not relative to the public folder.

  const contactDtlBgImg = `${process.env.PUBLIC_URL}/images/man-76.jpg`;
  const prevCardBgImg = `${process.env.PUBLIC_URL}/images/bruno-guerrero.jpg`; //unsplash
  const activeCardBgImg = `${process.env.PUBLIC_URL}/images/painting-48.jpg`;
  const nextCardBgImg = `${process.env.PUBLIC_URL}/images/samuel-berner.jpg`;

  return (
    <div className="slider-container" style={{ backgroundImage: `url(${contactDtlBgImg})`}}>
        {successMessage && (
          <div className="success-message-container">
            <p className="success-message">{successMessage}</p>
          </div>
        )}

      <h2 className="contact-details-title">View Contact Details</h2>


      <section id="slider" className="slider">
        <div className="carousel" >
          <div className="card prev" style={{backgroundImage: `url(${prevCardBgImg})`}} onClick={() => setCurrentSlide(prevIndex)}>
            <div className='card-header-contact-detail'>
             <h2 style={{color:"#f0f0f0"}}>{contacts[prevIndex].name}</h2>
             <i
            className="bi bi-person-fill-slash delete-icon icon-large"
            onClick={() => handleDeleteClick(contacts[prevIndex])}
            title="Delete Contact"
          ></i>
        </div>
          <p>
            <span className="header-text-prev"><strong>Phone:</strong></span> 
            <span className="content-text-prev">{contacts[prevIndex].phone}</span>
          </p>
          <p> 
            <span className="header-text-prev"><strong>Email:</strong></span> 
            <span className="content-text-prev">{contacts[prevIndex].email}</span>
          </p>  
          <p>
            <span className="header-text-prev"><strong>Address:</strong></span> 
            <span className="content-text-prev">{contacts[prevIndex].address}</span>
          </p>
          <p>
            <span className="header-text-prev"><strong>Job Title:</strong></span> 
            <span className="content-text-prev">{contacts[prevIndex].jobTitle}</span>
          </p>
          <p>
            <span className="header-text-prev"><strong>Company:</strong></span> 
            <span className="content-text-prev">{contacts[prevIndex].company}</span>
          </p>
          <p>
            <span className="header-text-prev"><strong>Date of Birth:</strong></span> 
            <span className="content-text-prev">{contacts[prevIndex].dob}</span>
          </p>
          <p className="quote-text">
            <span className="header-text-prev"><strong>Quote to live by:</strong></span> 
            <span className="content-text-prev">{contacts[prevIndex].quote}</span>
          </p>
        </div>

          <div className="card active" style={{backgroundImage: `url(${activeCardBgImg})`}} onClick={() => setCurrentSlide(currentSlide)}>
          <div className='card-header-contact-detail'>
            <h2>{contacts[currentSlide].name}</h2>
            <i
            className="bi bi-person-fill-slash delete-icon-active icon-large"
            onClick={() => handleDeleteClick(contacts[currentSlide])}
            title="Delete Contact"
          ></i>
        </div>
          <p>
            <span className="header-text-active"><strong>Phone:</strong></span> 
            <span className="content-text-active">{contacts[currentSlide].phone}</span>
          </p>
          <p>
            <span className="header-text-active"><strong>Email:</strong></span> 
            <span className="content-text-active">{contacts[currentSlide].email}</span>
          </p>
          <p>
            <span className="header-text-active"><strong>Address:</strong></span> 
            <span className="content-text-active">{contacts[currentSlide].address}</span>
          </p>
          <p>
            <span className="header-text-active"><strong>Job Title:</strong></span> 
            <span className="content-text-active">{contacts[currentSlide].jobTitle}</span>
          </p>
          <p>
            <span className="header-text-active"><strong>Company:</strong></span> 
            <span className="content-text-active">{contacts[currentSlide].company}</span>
          </p>
          <p>
            <span className="header-text-active"><strong>Date of Birth:</strong></span> 
            <span className="content-text-active">{contacts[currentSlide].dob}</span>
          </p>
          <p className="quote-text">
            <span className="header-text-active"><strong>Quote to live by:</strong></span> 
            <span className="content-text-active">{contacts[currentSlide].quote}</span>
          </p>
        </div>

          <div className="card next" style={{backgroundImage: `url(${nextCardBgImg})`}} onClick={() => setCurrentSlide(nextIndex)}>
            <div className='card-header-contact-detail'>

              <h2 style={{color:"#f0f0f0"}}>{contacts[nextIndex].name}</h2>
              <i
              className="bi bi-person-fill-slash delete-icon icon-large"
              onClick={() => handleDeleteClick(contacts[nextIndex])}
              title="Delete Contact"
              ></i>
          </div>
            <p>
              <span className="header-text-next"><strong>Phone:</strong></span> 
              <span className="content-text-next">{contacts[nextIndex].phone}</span>
            </p>
            <p>
              <span className="header-text-next"><strong>Email:</strong></span> 
              <span className="content-text-next">{contacts[nextIndex].email}</span>
            </p>
            <p>
              <span className="header-text-next"><strong>Address:</strong></span> 
              <span className="content-text-next">{contacts[nextIndex].address}</span>
            </p>
            <p>
              <span className="header-text-next"><strong>Job Title:</strong></span> 
              <span className="content-text-next">{contacts[nextIndex].jobTitle}</span>
            </p>
            <p>
              <span className="header-text-next"><strong>Company:</strong></span> 
              <span className="content-text-next">{contacts[nextIndex].company}</span>
            </p>
            <p>
              <span className="header-text-next"><strong>Date of Birth:</strong></span> 
              <span className="content-text-next">{contacts[nextIndex].dob}</span>
            </p>
            <p className="quote-text">
              <span className="header-text-next"><strong>Quote to live by: </strong></span> 
              <span className="content-text-next">{contacts[nextIndex].quote}</span>
            </p>
          </div>
        </div>

        <button className="nav-button left" onClick={prevSlide} aria-label="Previous Slide" title="Previous Contact">
          &#10094;
        </button>
        <button className="nav-button right" onClick={nextSlide} aria-label="Next Slide" title="Next Contact">
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