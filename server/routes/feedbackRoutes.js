// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Use the base path directly
router.post('/', feedbackController.createFeedback);  // Changed from '/feedback' to '/'
router.get('/', feedbackController.getFeedbacks);    // Changed from '/feedback' to '/'

module.exports = router;
