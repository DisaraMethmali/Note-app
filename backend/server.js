const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const mongoURI = "mongodb+srv://dis:tRPMxJ8vJtPsbbz5@cluster0.l8qlknk.mongodb.net/note";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  });

// Import and use the notes router
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

// Define a basic route for testing
app.get('/api/notes', (req, res) => {
  res.send('Welcome to the Note API');
});

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
