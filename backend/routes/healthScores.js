// routes/healthScores.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const HealthScore = require('../models/HealthScore');

const memoryScores = [];
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// @route   POST api/health-scores
// @desc    Create a new health score
// @access  Private
router.post('/', auth, async (req, res) => {
  const { score, answers } = req.body;

  if (isDbConnected()) {
    try {
      const newHealthScore = new HealthScore({
        user: req.user.id,
        score,
        answers
      });
      const healthScore = await newHealthScore.save();
      return res.json(healthScore);
    } catch (err) {
      console.error('MongoDB health score save error, falling back:', err.message);
    }
  }

  const record = {
    _id: 'hs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    user: req.user.id,
    score,
    answers,
    date: new Date()
  };
  memoryScores.push(record);
  res.json(record);
});

// @route   GET api/health-scores
// @desc    Get all health scores for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  if (isDbConnected()) {
    try {
      const healthScores = await HealthScore.find({ user: req.user.id }).sort({ date: -1 });
      return res.json(healthScores);
    } catch (err) {
      console.error('MongoDB health score get error:', err.message);
    }
  }

  const userScores = memoryScores.filter(s => s.user === req.user.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(userScores);
});

// @route   DELETE api/health-scores/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  if (isDbConnected()) {
    try {
      await HealthScore.deleteOne({ _id: req.params.id, user: req.user.id });
      return res.json({ msg: 'Health score removed' });
    } catch (err) {
      console.error('MongoDB health score delete error:', err.message);
    }
  }

  const index = memoryScores.findIndex(s => s._id === req.params.id && s.user === req.user.id);
  if (index !== -1) {
    memoryScores.splice(index, 1);
  }
  res.json({ msg: 'Health score removed' });
});

module.exports = router;
