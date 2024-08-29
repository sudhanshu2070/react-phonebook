// server.ts
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000; // Server runs on port 5000 

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Contact model
const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  jobTitle: String,
  company: String,
  dob: String,
  quote:String,
});

const Contact = mongoose.model('contacts', ContactSchema); // Specify the 'contacts' collection explicitly

// API endpoint to get contact by name
app.get('/api/contacts/', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection("contacts");

    const nameToSearch = req.query.name; // 
    let contact;
    
    if (nameToSearch) {
      // If name is provided, search for contacts with that name
      contact = await collection.find({ name: nameToSearch }).toArray();
    } else {
      // Otherwise, return all contacts
      contact = await collection.find().toArray();
    }
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).send('Contact not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/api/test', (req, res) => {
  console.log('Test route reached');
  res.send('Test route is working');
});

app.post('/api/contacts', async (req, res) => {
  const {name, phone, email, address, jobTitle, company, dob, quote} = req.body;
  
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
});

// DELETE route to delete a contact by ID
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the contact
    const result = await Contact.findByIdAndDelete(id);

    if (result) {
      // Contact was found and deleted
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      // Contact with that ID was not found
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});