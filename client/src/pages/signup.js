import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // Default role
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Reset error on input change
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Example validation (at least 6 characters)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Make API call to signup
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email: formData.email,
        password: formData.password,
        role: formData.role, // Use default role 'user'
      });

      // Show success toast message
      toast.success('Signup successful! Please log in.');
      
      // Reset form
      setFormData({ email: '', password: '', role: 'user' });
    } catch (error) {
      // Handle errors (e.g., user already exists)
      if (error.response && error.response.status === 409) {
        setError('Email already exists. Please log in or use a different email.');
      } else {
        setError('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Removed the role selection dropdown */}
        <input type="hidden" name="role" value={formData.role} />
        
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
