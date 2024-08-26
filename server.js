// server.ts
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
  const {name, phone, email, address, jobTitle, company, dob} = req.body;
  
  const newContact = new Contact({
    name,
    phone,
    email,
    address,
    jobTitle,
    company, 
    dob
  });
  await newContact.save();
  res.json(newContact);
});


// Start the server
app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});