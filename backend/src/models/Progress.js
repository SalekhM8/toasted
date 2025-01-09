// backend/src/models/Progress.js
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weights: [{
    weight: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  completedWorkouts: [{
    date: Date,
    workoutId: String,
    planId: Number
  }],
  completedMeals: [{
    date: Date,
    mealId: String,
    planId: Number
  }],
  streak: {
    current: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', ProgressSchema);