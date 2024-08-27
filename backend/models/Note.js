const mongoose = require('mongoose');

// Define the schema for the Note model
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the content
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default to current date and time
  },
});

// Create and export the Note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

