// controllers/checklistController.js

const Checklist = require('../models/Checklist');

// ✅ Create a new checklist with image
exports.createChecklist = async (req, res) => {
  try {
    const { name } = req.body;
    let questions;

    // Parse questions if it is in string format
    try {
      questions = typeof req.body.questions === 'string'
        ? JSON.parse(req.body.questions)
        : req.body.questions;
      
    } catch (err) {
      console.error('Error parsing questions:', err);
      return res.status(400).json({ message: 'Invalid JSON format for questions' });
    }

    // Validate input
    if (!name || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Checklist name and questions are required' });
    }

    // Save the image file path in the checklist
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create the checklist
    const checklist = new Checklist({
      name,
      questions,
      image: imageUrl, // Save image URL associated with this checklist
    });

    const createdChecklist = await checklist.save();
    res.status(201).json(createdChecklist);
  } catch (error) {
    console.error('Error creating checklist:', error);
    res.status(400).json({ message: 'Error creating checklist', error: error.message });
  }
};


// ✅ Get all checklists (for admin, procurement manager, inspection manager)
exports.getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find();
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching checklists' });
  }
};

// ✅ Get single checklist by ID
exports.getChecklistById = async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist not found' });
    }
    res.json(checklist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching checklist' });
  }
};
