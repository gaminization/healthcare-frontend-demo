// routes/volunteering.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Volunteering = require('../models/Volunteering');

// @route   POST api/volunteering
// @desc    Create a new volunteering record
// @access  Private
router.post('/', auth, async (req, res) => {
  const { project, hours, description } = req.body;

  try {
    const newVolunteering = new Volunteering({
      user: req.user.id,
      project,
      hours,
      description
    });

    const volunteering = await newVolunteering.save();
    res.json(volunteering);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/volunteering
// @desc    Get all volunteering records for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const volunteering = await Volunteering.find({ user: req.user.id }).sort({ date: -1 });
    res.json(volunteering);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/volunteering/:id
// @desc    Get a specific volunteering record
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const volunteering = await Volunteering.findById(req.params.id);

    // Check if volunteering record exists
    if (!volunteering) {
      return res.status(404).json({ msg: 'Volunteering record not found' });
    }

    // Check user ownership
    if (volunteering.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(volunteering);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Volunteering record not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/volunteering/:id
// @desc    Update a volunteering record
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { project, hours, description } = req.body;

  try {
    let volunteering = await Volunteering.findById(req.params.id);

    // Check if volunteering record exists
    if (!volunteering) {
      return res.status(404).json({ msg: 'Volunteering record not found' });
    }

    // Check user ownership
    if (volunteering.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update fields
    volunteering.project = project;
    volunteering.hours = hours;
    volunteering.description = description;

    await volunteering.save();
    res.json(volunteering);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Volunteering record not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/volunteering/:id
// @desc    Delete a volunteering record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const volunteering = await Volunteering.findById(req.params.id);

    // Check if volunteering record exists
    if (!volunteering) {
      return res.status(404).json({ msg: 'Volunteering record not found' });
    }

    // Check user ownership
    if (volunteering.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Volunteering.deleteOne({ _id: volunteering._id });
    res.json({ msg: 'Volunteering record removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Volunteering record not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
