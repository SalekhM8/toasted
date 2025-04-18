const mongoose = require('mongoose');

const workoutSwapLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  workoutDate: { 
    type: Date, 
    required: true, 
    index: true 
  }, // Date the swap applies to
  originalExerciseName: { 
    type: String, 
    required: true 
  }, // Name in the base plan
  swappedExerciseName: { 
    type: String, 
    required: true 
  }, // Name of the chosen alternative
  workoutPlanId: { 
    type: String, 
    required: true 
  }, // Base plan ID for context
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Compound index for efficiently finding swaps for a user on a specific date
workoutSwapLogSchema.index({ userId: 1, workoutDate: 1 });

// Ensure only one swap per original exercise per user per day
// Note: Use workoutDate directly might be tricky if times differ. Consider normalizing to day start.
// For simplicity, we might handle upserts in the controller instead of a unique index initially.
// workoutSwapLogSchema.index({ userId: 1, workoutDate: 1, originalExerciseName: 1 }, { unique: true });

module.exports = mongoose.model('WorkoutSwapLog', workoutSwapLogSchema); 