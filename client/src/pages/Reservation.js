import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation } from '../slices/reservationSlice';
import axios from 'axios';
import './Reservation.css';

const CreateReservation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); // Get the logged-in user
  const [formData, setFormData] = useState({
    name: '',
    email: user ? user.email : '', // Autofill with user's email if available
    date: '',
    time: '',
    guests: 1,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Autofill email when the component mounts
    if (user && user.email) {
      setFormData(prevData => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', formData);
      dispatch(addReservation(response.data)); // Dispatch the new reservation to the store
      setSuccessMessage('Reservation created successfully!');
      setFormData({
        name: '',
        email: user ? user.email : '', // Reset email to user's email after submission
        date: '',
        time: '',
        guests: 1,
      });
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating reservation:', error);
      setErrorMessage('Failed to create reservation. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-reservation-container">
      <h1>Create a New Reservation</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="reservation-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Guests:</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit">Create Reservation</button>
      </form>
    </div>
  );
};

export default CreateReservation;
