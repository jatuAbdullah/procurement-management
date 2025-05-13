// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers,getUserById } = require('../controllers/userController');
const { protect,authorize } = require('../middlewares/authMiddleware'); // ensure this protects the route

router.get('/', protect, authorize('admin'), getAllUsers); // GET /api/users
router.get('/:id', protect, authorize('admin'), getUserById);

module.exports = router;
