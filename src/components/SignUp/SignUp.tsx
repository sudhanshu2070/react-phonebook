import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; 

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    number: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SignUp form data:', formData);
    // Add logic for submitting form data to the server

    navigate('/home');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">

          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Name"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Username"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              required
              placeholder="Phone Number"
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
            />
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p>
        Already have an account? <Link to="/" className="signIn-link">Sign In</Link>
      </p>
      </div>
    </div>
  );
};

export default SignUp;
