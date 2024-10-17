const User = require('../models/User'); // Adjust this import based on your User model path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('Auth controller loaded');

// User registration
exports.signup = async (req, res) => {
    console.log('Signup request received:', req.body);
    const { email, password } = req.body; // Change from username to email

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email }); // Check by email
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword }); // Change from username to email
        await newUser.save();

        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    console.log('Login request received:', req.body);
    const { email, password } = req.body; // Change from username to email

    try {
        // Find the user
        const user = await User.findOne({ email }); // Check by email
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a token (optional)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
