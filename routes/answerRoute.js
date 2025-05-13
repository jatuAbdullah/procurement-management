const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { submitChecklistAnswers,getAnswersForOrder } = require('../controllers/answerController');

const router = express.Router();

// For one image per request:
router.post(
  '/submit',
  protect,
  authorize(['inspection_manager', 'admin']),
  upload.any(), // OR upload.single('image') or upload.fields([{ name: 'image' }])
  submitChecklistAnswers
);
router.get('/:orderId', protect, authorize(['admin','inspection_manager', 'procurement_manager']), getAnswersForOrder);

module.exports = router;
