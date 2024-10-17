import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { setReservations } from '../slices/reservationSlice';
import axios from 'axios';
import './profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const reservations = useSelector(state => state.reservations) || [];
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  console.log(user); // Log user object for debugging

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        // Use username if email is not present
        const userEmail = user.email || user.username;
        console.log('Current user email:', userEmail); // Log user email

        try {
          const response = await axios.get(`http://localhost:5000/api/reservations?email=${userEmail}`);
          console.log('Response Data:', response.data); // Log the response data
          dispatch(setReservations(response.data)); // Dispatch reservations to Redux store
        } catch (error) {
          console.error('Error fetching reservations:', error);
          setErrorMessage('Failed to fetch reservations. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // No user logged in
      }
    };

    fetchReservations();
  }, [user, dispatch]);

  if (!user) {
    return <div className="profile-container">User not found. Please log in.</div>;
  }

  if (loading) {
    return <div className="loading">Fetching your reservations...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
        Profile
      </h1>
      <div className="profile-info">
        <div className="profile-field">
          <strong>Username:</strong> <span>{user.username || user.email}</span>
        </div>
        <div className="profile-field">
          <strong>Email:</strong> <span>{user.email || user.username || 'N/A'}</span>
        </div>
      </div>

      <h2>Your Reservations</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {reservations.length === 0 ? (
        <p>No reservations found for {user.email || user.username}.</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-item">
              <p><strong>Name:</strong> {reservation.name}</p>
              <p><strong>Email:</strong> {reservation.email}</p>
              <p><strong>Date:</strong> {reservation.date}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>Guests:</strong> {reservation.guests}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
