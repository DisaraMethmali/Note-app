const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Ensure the path is correct

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error('Failed to fetch notes:', err.message); // Log the error
    res.status(500).json({ message: 'Failed to fetch notes', error: err.message });
  }
});

// Add a new note
router.post('/', async (req, res) => {
  const { text } = req.body;

  // Validate note content
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ message: 'Invalid note content. It must be a non-empty string.' });
  }

  // Create a new note instance
  const note = new Note({
    content: text.trim(),
  });

  try {
    // Save the note to the database
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Failed to save note:', err.message); // Log the error
    res.status(500).json({ message: 'Failed to save note', error: err.message });
  }
});

// Edit a note
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  // Validate note content
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ message: 'Invalid note content. It must be a non-empty string.' });
  }

  try {
    // Find and update the note
    const updatedNote = await Note.findByIdAndUpdate(id, { content: text.trim() }, { new: true });

    // Check if note was found and updated
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (err) {
    console.error('Failed to update note:', err.message); // Log the error
    res.status(500).json({ message: 'Failed to update note', error: err.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the note
    const deletedNote = await Note.findByIdAndDelete(id);

    // Check if note was found and deleted
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(204).send(); // No content to send back
  } catch (err) {
    console.error('Failed to delete note:', err.message); // Log the error
    res.status(500).json({ message: 'Failed to delete note', error: err.message });
  }
});

module.exports = router;
