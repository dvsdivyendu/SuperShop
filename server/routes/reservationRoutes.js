const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Create a reservation
router.post('/', reservationController.createReservation);

// Get reservations by email
router.get('/', reservationController.getReservations);

// Delete a reservation by ID
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
