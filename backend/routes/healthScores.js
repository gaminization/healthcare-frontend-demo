// routes/healthScores.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const HealthScore = require('../models/HealthScore');

// @route   POST api/health-scores
// @desc    Create a new health score
// @access  Private
router.post('/', auth, async (req, res) => {
  const { score, answers } = req.body;

  try {
    const newHealthScore = new HealthScore({
      user: req.user.id,
      score,
      answers
    });

    const healthScore = await newHealthScore.save();
    res.json(healthScore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/health-scores
// @desc    Get all health scores for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const healthScores = await HealthScore.find({ user: req.user.id }).sort({ date: -1 });
    res.json(healthScores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/health-scores/:id
// @desc    Get a specific health score
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const healthScore = await HealthScore.findById(req.params.id);

    // Check if health score exists
    if (!healthScore) {
      return res.status(404).json({ msg: 'Health score not found' });
    }

    // Check user ownership
    if (healthScore.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(healthScore);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Health score not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/health-scores/:id
// @desc    Delete a health score
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const healthScore = await HealthScore.findById(req.params.id);

    // Check if health score exists
    if (!healthScore) {
      return res.status(404).json({ msg: 'Health score not found' });
    }

    // Check user ownership
    if (healthScore.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await HealthScore.deleteOne({ _id: healthScore._id });
    res.json({ msg: 'Health score removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Health score not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
