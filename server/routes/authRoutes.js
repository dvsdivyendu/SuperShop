const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

console.log('Auth routes loaded:', { signup, login });

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
