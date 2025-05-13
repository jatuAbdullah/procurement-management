const Answer = require('../models/Answer');
const Checklist = require('../models/Checklist');
const Order = require('../models/Order');

exports.submitChecklistAnswers = async (req, res) => {
  try {


    const checklistId = req.body.checklistId;
    const orderId = req.body.orderId;

    

    // Parse 'responses'
    let responses;
    try {
      responses = typeof req.body.responses === 'string'
        ? JSON.parse(req.body.responses)
        : req.body.responses;

    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON in responses' });
    }

    // Fetch checklist
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist not found' });
    }


    // Validate responses
    for (let question of checklist.questions) {
      const response = responses.find(r => r.questionId === question._id.toString());

      if (question.isRequired && (!response || response.answer === undefined || response.answer === '')) {
        return res.status(400).json({ message: `Required question not answered: "${question.question}"` });
      }

      if (response) {
        // Handle image upload
        if (question.type === 'image') {
        
          // Find the file for this specific question by matching fieldname or originalname
          const imageFile = req.files?.find(file => 
              file.fieldname === `image-${question._id.toString()}` || 
              file.originalname.includes(question._id.toString())
          );
        
          if (imageFile) {
              response.imageUrl = `/uploads/${imageFile.filename}`;
          } else if (question.isRequired) {
              return res.status(400).json({ message: `Image required for: "${question.question}"` });
          } else {
              response.imageUrl = null;
          }
      }
      
      
        
        // Type validation
        switch (question.type) {
          case 'boolean':
            // Convert string 'true'/'false' to boolean if needed
            if (typeof response.answer === 'string') {
              response.answer = response.answer.toLowerCase() === 'true';
            }
            if (typeof response.answer !== 'boolean') {
              return res.status(400).json({ message: `Answer for "${question.question}" must be boolean` });
            }
            break;
          case 'dropdown':
            if (!question.options.includes(response.answer)) {
              return res.status(400).json({ message: `Invalid option for "${question.question}"` });
            }
            break;
          case 'text':
            response.answer = String(response.answer);
            break;
          case 'image':
            // Already handled above
            break;
          default:
            return res.status(400).json({ message: `Unsupported question type: ${question.type}` });
        }
      }
    }

    // Save response
    const newAnswer = new Answer({
      checklist: checklistId,
      order: orderId,
      filledBy: req.user._id,
      responses: responses,
    });

    const saved = await newAnswer.save();
    console.log('Saved answer:', saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Get answers for a specific order
exports.getAnswersForOrder = async (req, res) => {
    const { orderId } = req.params;  // Extract orderId from request parameters
    try {
      // Find all answers related to this order and populate the associated fields
      const answers = await Answer.find({ order: orderId })
        .populate('checklist')  // Populate the checklist details
        .populate('filledBy');  // Populate user who filled the answers (inspection manager)
  
      if (!answers.length) {
        return res.status(404).json({ message: 'No answers found for this order' });
      }
  
      // Return the answers
      res.json(answers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };