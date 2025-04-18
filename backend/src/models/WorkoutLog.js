const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  workoutPlanId: { 
    type: String, 
    required: true 
  }, // ID of the base plan
  exerciseName: { 
    type: String, 
    required: true, 
    index: true 
  }, // Name of exercise performed
  workoutDate: { 
    type: Date, 
    required: true, 
    index: true 
  }, // Date the workout was performed
  weightLifted: { 
    type: Number 
  },
  weightUnit: { 
    type: String, 
    enum: ['kg', 'lbs'] 
  },
  repsCompleted: { 
    type: String // Actual reps achieved, if needed, or use repsLeftInTank
  }, 
  repsLeftInTank: { 
    type: String, 
    enum: ["Couldn't complete all reps", "0 - reached failure", "1", "2", "3", "4+"], 
    required: true 
  },
  painReported: { 
    type: Boolean, 
    default: false 
  },
  painNotes: { 
    type: String 
  },
  targetSets: { 
    type: Number 
  }, // Original target sets for context
  targetReps: { 
    type: String 
  }, // Original target reps for context
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Optional: Compound index for efficient lookups of recent logs per user/exercise
workoutLogSchema.index({ userId: 1, exerciseName: 1, workoutDate: -1 }); 

module.exports = mongoose.model('WorkoutLog', workoutLogSchema); 