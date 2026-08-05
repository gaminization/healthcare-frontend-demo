// models/user.model.js
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const User = mongoose.model('User', userSchema);
// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable in production
  

module.exports = User;
