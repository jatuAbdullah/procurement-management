// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming the 'User' model represents both clients and managers
      required: true,
    },
    procurementManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inspectionManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Same User model
    },
    checklist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Checklist',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    confirmedByProcurement: {
      type: Boolean,
      default: false, // Not confirmed initially
    },    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
