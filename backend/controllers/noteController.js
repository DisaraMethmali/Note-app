// controllers/noteController.js
const Note = require('../models/noteModel');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new note
// @route   POST /api/notes
// @access  Public
const addNote = async (req, res) => {
  try {
    const note = new Note({
      content: req.body.content,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  addNote,
};
