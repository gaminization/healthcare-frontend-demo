// routes/volunteering.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Volunteering = require('../models/Volunteering');

const memoryVolunteering = [];
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// @route   POST api/volunteering
// @access  Private
router.post('/', auth, async (req, res) => {
  const { project, hours, description } = req.body;

  if (isDbConnected()) {
    try {
      const newVolunteering = new Volunteering({
        user: req.user.id,
        project,
        hours,
        description
      });
      const volunteering = await newVolunteering.save();
      return res.json(volunteering);
    } catch (err) {
      console.error('MongoDB volunteering save error:', err.message);
    }
  }

  const record = {
    _id: 'vol_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    user: req.user.id,
    project,
    hours,
    description,
    date: new Date()
  };
  memoryVolunteering.push(record);
  res.json(record);
});

// @route   GET api/volunteering
// @access  Private
router.get('/', auth, async (req, res) => {
  if (isDbConnected()) {
    try {
      const volunteering = await Volunteering.find({ user: req.user.id }).sort({ date: -1 });
      return res.json(volunteering);
    } catch (err) {
      console.error('MongoDB volunteering get error:', err.message);
    }
  }

  const userRecords = memoryVolunteering.filter(v => v.user === req.user.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(userRecords);
});

module.exports = router;
