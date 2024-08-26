// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const { getNotes, addNote } = require('../controllers/noteController');

// GET /api/notes
router.get('/', getNotes);

// POST /api/notes
router.post('/', addNote);

module.exports = router;
