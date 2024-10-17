import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice'; // Import the login action
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios

const Login = ({ setToast }) => {
  const dispatch = useDispatch(); // Hook to access the dispatch function
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear any previous error messages
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email, // Change from username to email
        password: formData.password,
      });

      // Assuming the API returns a token
      localStorage.setItem('token', response.data.token);
      
      // Dispatch the login action with user data
      dispatch(login({ email: formData.email, role: 'user' })); // Adjust role as needed

      // Navigate to the cart page
      navigate('/cart'); // Redirect to the cart page
    } catch (error) {
      setToast('Invalid email or password');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <NavLink to="/signup" className="link">Sign Up</NavLink>
      </p>
    </div>
  );
};

export default Login;
