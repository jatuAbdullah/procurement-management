// routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { registerUser,loginUser } = require('../controllers/authController');


const router = express.Router();

// Register - only admin can register users
router.post(
    '/register',
    protect,
    authorize(['admin']),
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Valid email is required'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      body('role').isIn(['admin', 'procurement-manager', 'inspection-manager', 'client'])
        .withMessage('Invalid role'),
    ],
    registerUser
  );
  
  // Login
  router.post(
    '/login',
    [
      body('email').isEmail().withMessage('Valid email is required'),
      body('password').notEmpty().withMessage('Password is required'),
    ],
    loginUser
  );

module.exports = router;
