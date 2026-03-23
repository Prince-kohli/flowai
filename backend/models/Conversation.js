const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      default: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);
