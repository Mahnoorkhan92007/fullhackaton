const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authcontroller');

// Signup route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;




