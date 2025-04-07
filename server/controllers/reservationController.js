const Reservation = require('../models/Reservation');

// Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).json({ message: 'Reservation created', reservation: newReservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Error creating reservation' });
    }
};

// Get all reservations or reservations by email
exports.getAllReservations = async (req, res) => {
    try {
        const { email } = req.query; // Get the email from query parameters
        let reservations;

        if (email) {
            // If an email is provided, fetch reservations for that email
            reservations = await Reservation.find({ email });
        } else {
            // Otherwise, fetch all reservations
            reservations = await Reservation.find({});
        }

        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Error fetching reservations' });
    }
};

// Delete a reservation by ID
exports.deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Reservation.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ message: 'Error deleting reservation' });
    }
};

// Update a reservation by ID
exports.updateReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation updated', reservation: updatedReservation });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Error updating reservation' });
    }
};
