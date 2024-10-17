const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true }, // Consider using Date type for better handling
    time: { type: String, required: true },
    guests: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
