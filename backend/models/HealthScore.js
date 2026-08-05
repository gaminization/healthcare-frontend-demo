// models/HealthScore.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthScoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  answers: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HealthScore', HealthScoreSchema);
