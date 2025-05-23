import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { setReservations } from '../slices/reservationSlice';
import axios from 'axios';
import './profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const reservations = useSelector(state => state.reservations) || [];
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingReservation, setEditingReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        const userEmail = user.email || user.username;
        try {
          const response = await axios.get(`http://localhost:5000/api/reservations?email=${userEmail}`);
          dispatch(setReservations(response.data));
        } catch (error) {
          console.error('Error fetching reservations:', error);
          setErrorMessage('Failed to fetch reservations. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); 
      }
    };

    fetchReservations();
  }, [user, dispatch]);

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      dispatch(setReservations(reservations.filter(res => res._id !== reservationId)));
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setErrorMessage('Could not delete reservation.');
    }
  };

  const handleUpdateReservation = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/reservations/${editingReservation._id}`,
        editingReservation
      );
      dispatch(setReservations(reservations.map(res =>
        res._id === editingReservation._id ? response.data.reservation : res
      )));
      setEditingReservation(null);
    } catch (error) {
      console.error('Error updating reservation:', error);
      setErrorMessage('Could not update reservation.');
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        Profile
      </h1>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username || user.email}</p>
        <p><strong>Email:</strong> {user.email || user.username}</p>
      </div>

      <h2>Your Reservations</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {loading ? (
        <p className="loading">Fetching your reservations...</p>
      ) : (
        <div className="reservations-list">
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            reservations.map(reservation => (
              <div key={reservation._id} className="reservation-item">
                <p><strong>Name:</strong> {reservation.name}</p>
                <p><strong>Date:</strong> {reservation.date}</p>
                <p><strong>Guests:</strong> {reservation.guests}</p>
                <div className="reservation-actions">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteReservation(reservation._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => setEditingReservation(reservation)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {editingReservation && (
        <div className="edit-modal">
          <div className="edit-modal-header">
            <h3>Edit Reservation</h3>
            <button
              className="close-modal-button"
              onClick={() => setEditingReservation(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <input
            type="text"
            value={editingReservation.name}
            onChange={e => setEditingReservation({ ...editingReservation, name: e.target.value })}
          />
          <input
            type="date"
            value={editingReservation.date}
            onChange={e => setEditingReservation({ ...editingReservation, date: e.target.value })}
          />
          <input
            type="number"
            min="1"
            value={editingReservation.guests}
            onChange={e => setEditingReservation({ ...editingReservation, guests: e.target.value })}
          />
          <button onClick={handleUpdateReservation} className="update-button">Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
