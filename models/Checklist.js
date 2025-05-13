const mongoose = require('mongoose');

const checklistSchema = mongoose.Schema(
  {
    name: { type: String, required: true },  // Name of the checklist
    questions: [
      {
        question: { type: String, required: true },  // Question to be answered
        type: { 
          type: String, 
          enum: ['boolean', 'dropdown', 'text', 'image'], // 👈 added 'image'
          required: true 
        },
        options: [String],  // For dropdown or multiple choice
        isRequired: { type: Boolean, default: true },  // Is the question required?
      },
    ],
    image: { type: String, default: null }, // To store image URL or path  
  },
  {
    timestamps: true,
  }
);

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
