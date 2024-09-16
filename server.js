// server.ts
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();// #SOS (keep this at top)

const bcrypt = require('bcryptjs');  // For hashing passwords

const jwt = require('jsonwebtoken'); // For issuing tokens

const app = express();
const port = 5000; // Server runs on port 5000 

const contactsDbURI = process.env.CONTACTS_DB_URI;
const authDbURI = process.env.AUTH_CONTACT_URI;

const jwtSecret = process.env.JWT_SECRET;  // Load from environment variables

// Middleware
app.use(cors());
app.use(express.json());

const saveGetContactDbConnection = mongoose.createConnection(contactsDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

saveGetContactDbConnection.once('open', ()=> {
  console.log('Contact DB connected');
});

const authContactDbConnection = mongoose.createConnection(authDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

authContactDbConnection.once('open', () => {
  console.log('Auth Contact DB connected');
});

// Schema for save/get Contact
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

// Using the 'contacts' to specify the particular collection(MongoDB)
const Contact = saveGetContactDbConnection.model('contacts', ContactSchema);

// Schema for login/SignUp detail 
const AuthContactSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  number: { type: String },
});

// Using 'auth_contact' to specify the particular collection(MongoDB)
const AuthContact = authContactDbConnection.model('auth_contacts', AuthContactSchema);

// Sign up route
app.post('/api/signup', async (req, res) => {
  const { username, email, password, name, number} = req.body;

  try {
    // Check if the user already exists
    let user = await AuthContact.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new AuthContact({
      username,
      email,
      password: hashedPassword,
      name,
      number,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await AuthContact.findOne({ username });
    console.log("user:", user);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Log the plain text password and the hashed password
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Issue JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    console.log(error);
    
    res.status(500).send('Server error');
  }
});

// Example protected route (use JWT token to authenticate)
app.get('/api/private', (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    res.json({ msg: 'Protected data' });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

// API endpoint to get contact by name
app.get('/api/contacts/', async (req, res) => {
  try {

    const nameToSearch = req.query.name; 
    let contact;
    
    if (nameToSearch) {
      // If name is provided, search for contacts with that name
      contact = await Contact.find({ name: nameToSearch });
      console.log(contact);
      
    } else {
      // Otherwise, return all contacts
      contact = await Contact.find();
    }
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).send('Contact not found');
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).send('Server error');
  }
});

app.get('/api/test', (req, res) => {
  console.log('Test route reached');
  res.send('Test route is working');
});

app.post('/api/contacts', async (req, res) => {
  const {name, phone, email, address, jobTitle, company, dob, quote} = req.body;
  
  try{
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
}
catch (error) {
  console.error('Error saving contact:', error);
  res.status(500).send('Server error');
}

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