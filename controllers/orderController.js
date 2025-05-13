// controllers/orderController.js
const Order = require('../models/Order');
const Checklist = require('../models/Checklist');

// Create a new order
exports.createOrder = async (req, res) => {
  const { clientId, procurementManagerId, inspectionManagerId, checklistId } = req.body;

  try {
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) {
      return res.status(400).json({ message: 'Checklist not found' });
    }

    const newOrder = new Order({
      client: clientId,
      procurementManager: procurementManagerId,
      inspectionManager: inspectionManagerId,
      checklist: checklistId,
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('client')
      .populate('procurementManager')
      .populate('inspectionManager')
      .populate('checklist');

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific order by its ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('client')
      .populate('procurementManager')
      .populate('inspectionManager')
      .populate('checklist');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role === 'admin' || req.user._id.toString() === order.client.toString()) {
      res.json(order);
    } else {
      res.status(403).json({ message: 'Not authorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Confirm order
exports.confirmOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Allow if user is admin or the assigned procurement manager
      const isProcurementManager = order.procurementManager.toString() === req.user._id.toString();
      const isAdmin = req.user.role === 'admin';
  
      if (!isProcurementManager && !isAdmin) {
        return res.status(403).json({ message: 'Not authorized to confirm this order' });
      }
  
      order.confirmedByProcurement = true;
      order.status = 'approved'; // optional status update
      await order.save();
  
      res.status(200).json({ message: 'Order confirmed successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  