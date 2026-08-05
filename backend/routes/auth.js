// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const User = require('../models/User');

// In-memory fallback store when MongoDB is not connected
const memoryUsers = [];

// Helper to check DB connection
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide all fields' });
  }

  // Use MongoDB if connected, otherwise fallback to in-memory store
  if (isDbConnected()) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = { user: { id: user.id } };
      const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
      
      jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      });
      return;
    } catch (err) {
      console.error('MongoDB register error, falling back to memory store:', err.message);
    }
  }

  // In-memory fallback handler
  try {
    const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const newUser = { id, name, email, password: hashedPassword };
    memoryUsers.push(newUser);

    const payload = { user: { id: newUser.id } };
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ msg: 'Server error during registration' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  if (isDbConnected()) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

        jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        });
        return;
      }
    } catch (err) {
      console.error('MongoDB login error, checking memory store:', err.message);
    }
  }

  // In-memory fallback
  try {
    const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  if (isDbConnected()) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (user) {
        return res.json(user);
      }
    } catch (err) {
      console.error('MongoDB get user error, checking memory store:', err.message);
    }
  }

  // Fallback
  const user = memoryUsers.find(u => u.id === req.user.id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  }

  // Fallback generic user
  res.json({ id: req.user.id, name: 'User', email: 'user@example.com' });
});

// @route   PUT api/auth/password
// @desc    Update user password
// @access  Private
router.put('/password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (isDbConnected()) {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.json({ msg: 'Password updated successfully' });
      }
    } catch (err) {
      console.error('MongoDB update password error:', err.message);
    }
  }

  // In-memory fallback
  const user = memoryUsers.find(u => u.id === req.user.id);
  if (user) {
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    return res.json({ msg: 'Password updated successfully' });
  }

  res.status(400).json({ msg: 'User not found' });
});

module.exports = router;
