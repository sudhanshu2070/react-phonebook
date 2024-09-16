import Contact from '../models/Contact';

const getContacts = async (req, res) => {
  try {
    const nameToSearch = req.query.name; 
    let contact;
    
    if (nameToSearch) {
      contact = await Contact.find({ name: nameToSearch });
    } else {
      contact = await Contact.find();
    }

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).send('Contact not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const addContact = async (req, res) => {
  const { name, phone, email, address, jobTitle, company, dob, quote } = req.body;

  try {
    const newContact = new Contact({
      name,
      phone,
      email,
      address,
      jobTitle,
      company,
      dob,
      quote
    });
    await newContact.save();
    res.json(newContact);
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Server error');
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Contact.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

export default { getContacts, addContact, deleteContact };