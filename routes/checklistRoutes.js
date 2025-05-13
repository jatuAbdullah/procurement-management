// routes/checklist.js

const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Import multer middleware
const {
  createChecklist,
  getAllChecklists,
  getChecklistById,
} = require('../controllers/checklistController'); // Import the controller functions
const router = express.Router();

// ✅ Create a new checklist with image (admin or procurement manager only)
router.post(
  '/create',
  protect,
  authorize(['admin', 'procurement_manager']),
  upload.single('image'), // Accept a single file with the field name 'image'
  createChecklist // Use the controller function to create the checklist
);

// ✅ Get all checklists (for admin, procurement manager, inspection manager)
router.get(
  '/',
  protect,
  authorize(['admin', 'procurement_manager', 'inspection_manager']),
  getAllChecklists // Use the controller function to get all checklists
);

// ✅ Get single checklist by ID
router.get(
  '/:id',
  protect,
  authorize(['admin', 'procurement_manager', 'inspection_manager']),
  getChecklistById // Use the controller function to get checklist by ID
);

module.exports = router;
