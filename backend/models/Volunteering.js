// models/Volunteering.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteeringSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Volunteering', VolunteeringSchema);
