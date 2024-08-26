// models/noteModel.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Note', noteSchema);
