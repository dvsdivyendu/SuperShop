import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = ({ setToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError('');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );

      console.log('Login response:', response.data);

      // Handle user info from the response
      const decodedToken = jwtDecode(response.data.token);
      console.log('Decoded JWT:', decodedToken);
      console.log('Email:', decodedToken.email);
      console.log('Role:', decodedToken.role);
      dispatch(
        login({
          email: decodedToken.email,
          role: decodedToken.role,
        
        })
      );

      // Navigate based on the user role
      navigate(decodedToken.role === 'admin' ? '/admin' : '/profile');
    } catch (error) {
      setToast('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
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
