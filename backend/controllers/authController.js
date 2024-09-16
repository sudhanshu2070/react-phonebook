import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AuthContact from '../models/AuthContact';
import jwtSecret from '../config/jwt';

const signup = async (req, res) => {
  const { username, email, password, name, number } = req.body;

  try {
    let user = await AuthContact.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

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
  
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AuthContact.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    const token = sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export default { signup, login };