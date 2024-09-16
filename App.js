import express, { json } from 'express';
import cors from 'cors';
import connectDb from './config/db';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import errorHandler from './middlewares/errorHandler';
import './config/env';

const app = express();
const port = 5000;

app.use(cors());
app.use(json());

const contactsDbURI = process.env.CONTACTS_DB_URI;
const authDbURI = process.env.AUTH_CONTACT_URI;

connectDb(contactsDbURI);
connectDb(authDbURI);

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});