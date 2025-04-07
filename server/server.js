const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { connectDB } = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup to allow credentials and specify origin
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's origin
    credentials: true, // Allow credentials
}));

app.use(express.json());

console.log('Connecting to database...');
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);
app.use('/images', express.static('public/images')); // Serve images from public/images

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
