// routes/reservationRoutes.js
const express = require('express');
const { createReservation, getAllReservations, deleteReservation, updateReservation } = require('../controllers/reservationController');
const router = express.Router();

// Create a new reservation
router.post('/', createReservation);

// Get reservations by email or all reservations
router.get('/', getAllReservations);

// Delete a reservation by ID
router.delete('/:id', deleteReservation);

// Update a reservation by ID
router.put('/:id', updateReservation);

module.exports = router;
