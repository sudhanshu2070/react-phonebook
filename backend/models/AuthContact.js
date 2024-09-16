import { Schema, model } from 'mongoose';

const AuthContactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  number: { type: String },
});

export default model('AuthContact', AuthContactSchema);