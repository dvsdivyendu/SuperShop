// components/Admin/ReservationSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ReservationSection.module.css'; // Import the CSS module

const ReservationSection = () => {
    const [reservations, setReservations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingReservation, setEditingReservation] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reservations');
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setErrorMessage('Failed to fetch reservations.');
            }
        };

        fetchReservations();
    }, []);

    const handleDeleteReservation = async (reservationId) => {
        try {
            await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
            setReservations(reservations.filter(reservation => reservation._id !== reservationId));
            setSuccessMessage('Reservation deleted successfully!');
        } catch (error) {
            console.error('Error deleting reservation:', error);
            setErrorMessage('Failed to delete reservation.');
        }
    };

    const handleUpdateReservation = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/reservations/${editingReservation._id}`, editingReservation);
            setReservations(reservations.map(reservation => reservation._id === editingReservation._id ? response.data.reservation : reservation));
            setSuccessMessage('Reservation updated successfully!');
            setEditingReservation(null);
        } catch (error) {
            console.error('Error updating reservation:', error);
            setErrorMessage('Failed to update reservation.');
        }
    };

    return (
        <div className="reservationContainer">
            <h2>Reservation Information</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <table className={styles.reservationTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation._id}>
                            <td>{reservation.name}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.time}</td>
                            <td>{reservation.guests}</td>
                            <td>
                                <button onClick={() => handleDeleteReservation(reservation._id)}style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                                <button onClick={() => setEditingReservation(reservation)}style={{backgroundColor:'#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingReservation && (
                <div className='editReservation'>
                    <h3>Edit Reservation</h3>
                    <input
                        type="text"
                        value={editingReservation.name}
                        onChange={e => setEditingReservation({ ...editingReservation, name: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editingReservation.email}
                        onChange={e => setEditingReservation({ ...editingReservation, email: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editingReservation.date}
                        onChange={e => setEditingReservation({ ...editingReservation, date: e.target.value })}
                    />
                    <input
                        type="time"
                        value={editingReservation.time}
                        onChange={e => setEditingReservation({ ...editingReservation, time: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editingReservation.guests}
                        min="1"
                        onChange={e => setEditingReservation({ ...editingReservation, guests: e.target.value })}
                    />
                    <button className='editreservationbutton' onClick={handleUpdateReservation}>Update Reservation</button>
                </div>
            )}
        </div>
    );
};

export default ReservationSection;
