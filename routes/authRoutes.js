// routes/authRoutes.js
const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { registerUser,loginUser } = require('../controllers/authController');


const router = express.Router();

// Register route - Only admin can register users
router.post('/register', protect, authorize(['admin']), registerUser);

// Login a user
router.post('/login', loginUser);

module.exports = router;
