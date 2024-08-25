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
const mongoURI = 'mongodb+srv://nonewuser0:yNiOtfKCTUly1c97@cluster0.4j0vn.mongodb.net/contacts_db?retryWrites=true&w=majority&appName=Cluster0';
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

const Contact = mongoose.model('Contact', ContactSchema);

// API Routes
app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
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
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});