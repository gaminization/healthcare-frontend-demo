// server-enhanced.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Increase header size limit
const server = http.createServer({
  maxHeaderSize: 32768 // 32KB
}, app);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: false // Try disabling credentials
}));

// Increase JSON payload limit and disable strict parsing
app.use(express.json({ 
  limit: '50mb',
  strict: false
}));
app.use(express.urlencoded({ 
  extended: false, 
  limit: '50mb',
  parameterLimit: 100000
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ msg: 'API is working' });
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/health-scores', require('./routes/healthScores'));
app.use('/api/volunteering', require('./routes/volunteering'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Server error', details: err.message });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
