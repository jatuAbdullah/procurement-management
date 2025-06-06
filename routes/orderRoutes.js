// routes/orderRoutes.js
const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  createOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  confirmOrder,
} = require('../controllers/orderController');

const router = express.Router();

// Create a new order (protected route)
router.post('/create', protect, authorize(['procurement_manager', 'admin']) ,  createOrder);

// Update the status of an order (accessible by Procurement Manager or Admin only)
router.put('/:id/status', protect, authorize(['procurement_manager', 'admin']) , updateOrderStatus);

// Get all orders (accessible by Admin or Procurement Manager)
router.get('/', protect, authorize(['procurement_manager', 'admin']) , getAllOrders);

// Get a specific order by its ID (accessible by the Client, Procurement Manager, or Admin)
router.get('/:id', protect, getOrderById);

// Procurement Manager confirms the order
router.put('/:id/confirm', protect, authorize(['procurement_manager', 'admin']) , confirmOrder);

module.exports = router;
