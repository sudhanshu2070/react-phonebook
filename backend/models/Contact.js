import { Schema, model } from 'mongoose';

const ContactSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  jobTitle: String,
  company: String,
  dob: String,
  quote: String,
});

export default model('Contact', ContactSchema);