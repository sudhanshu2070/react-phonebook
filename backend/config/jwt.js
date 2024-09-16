require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

export default jwtSecret;