const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Change to email
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // Optional: add role field
});

module.exports = mongoose.model('User', userSchema);
