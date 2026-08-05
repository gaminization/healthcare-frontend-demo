// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; // Changed to 5000 to avoid conflict with React

// Middleware
app.use(cors({
  origin: '*', // Temporary allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


// Increase JSON payload limit
app.use(express.json({ limit: '50mb', strict: false }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
// Connect to MongoDB
// server.js
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection FAILED:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/health-scores', require('./routes/healthScores'));
app.use('/api/volunteering', require('./routes/volunteering'));


// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
