const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  muscleGroups: {
    type: [String],
    required: true,
    enum: ['chest', 'back', 'shoulders', 'legs', 'arms', 'core', 'fullBody']
  },
  equipment: {
    type: [String],
    required: true,
    enum: ['none', 'dumbbell', 'barbell', 'machine', 'cable', 'bodyweight', 'resistance bands', 'kettlebell']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  type: {
    type: String,
    required: true,
    enum: ['strength', 'cardio', 'flexibility', 'balance']
  },
  timeRequired: {
    type: Number, // in minutes
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', ExerciseSchema); 