const mongoose = require('mongoose');

const answerSchema = mongoose.Schema(
  {
    checklist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Checklist',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    filledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // inspection manager
      required: true,
    },
    responses: [
      {
        questionId: String, // unique question _id from the checklist
        answer: mongoose.Schema.Types.Mixed, // boolean, string, array, etc.
        imageUrl: { type: String }, // image path for image-type questions
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Answer', answerSchema);
