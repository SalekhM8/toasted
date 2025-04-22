require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');

// Array of exercise data
const exercisesData = [
  // Strength Exercises - Beginner
  {
    name: 'Push Ups',
    description: 'A bodyweight exercise that works the chest, shoulders, and triceps.',
    muscleGroups: ['chest', 'shoulders', 'arms'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    type: 'strength',
    timeRequired: 5,
    imageUrl: 'https://example.com/push-ups.jpg',
    videoUrl: 'https://example.com/push-ups-video',
    tags: ['upper body', 'home workout']
  },
  {
    name: 'Bodyweight Squats',
    description: 'A compound exercise that targets the quadriceps, hamstrings, and glutes.',
    muscleGroups: ['legs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    type: 'strength',
    timeRequired: 5,
    imageUrl: 'https://example.com/squats.jpg',
    videoUrl: 'https://example.com/squats-video',
    tags: ['lower body', 'home workout']
  },
  {
    name: 'Plank',
    description: 'An isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.',
    muscleGroups: ['core'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    type: 'strength',
    timeRequired: 3,
    imageUrl: 'https://example.com/plank.jpg',
    videoUrl: 'https://example.com/plank-video',
    tags: ['core', 'home workout']
  },
  
  // Strength Exercises - Intermediate
  {
    name: 'Dumbbell Bench Press',
    description: 'A variation of the bench press using dumbbells that works the chest, shoulders, and triceps.',
    muscleGroups: ['chest', 'shoulders', 'arms'],
    equipment: ['dumbbell'],
    difficulty: 'intermediate',
    type: 'strength',
    timeRequired: 8,
    imageUrl: 'https://example.com/dumbbell-bench-press.jpg',
    videoUrl: 'https://example.com/dumbbell-bench-press-video',
    tags: ['upper body', 'chest']
  },
  {
    name: 'Barbell Squats',
    description: 'A compound exercise that targets the quadriceps, hamstrings, and glutes while adding resistance with a barbell.',
    muscleGroups: ['legs'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    type: 'strength',
    timeRequired: 8,
    imageUrl: 'https://example.com/barbell-squats.jpg',
    videoUrl: 'https://example.com/barbell-squats-video',
    tags: ['lower body', 'compound']
  },
  {
    name: 'Pull Ups',
    description: 'A bodyweight exercise that works the back, shoulders, and biceps.',
    muscleGroups: ['back', 'arms', 'shoulders'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    type: 'strength',
    timeRequired: 5,
    imageUrl: 'https://example.com/pull-ups.jpg',
    videoUrl: 'https://example.com/pull-ups-video',
    tags: ['upper body', 'back']
  },
  
  // Strength Exercises - Advanced
  {
    name: 'Barbell Deadlift',
    description: 'A compound exercise that works the back, glutes, hamstrings, and core.',
    muscleGroups: ['back', 'legs', 'core'],
    equipment: ['barbell'],
    difficulty: 'advanced',
    type: 'strength',
    timeRequired: 10,
    imageUrl: 'https://example.com/deadlift.jpg',
    videoUrl: 'https://example.com/deadlift-video',
    tags: ['compound', 'full body']
  },
  {
    name: 'Weighted Dips',
    description: 'A bodyweight exercise with added resistance that works the chest, shoulders, and triceps.',
    muscleGroups: ['chest', 'shoulders', 'arms'],
    equipment: ['bodyweight'],
    difficulty: 'advanced',
    type: 'strength',
    timeRequired: 8,
    imageUrl: 'https://example.com/weighted-dips.jpg',
    videoUrl: 'https://example.com/weighted-dips-video',
    tags: ['upper body', 'chest']
  },
  
  // Cardio Exercises
  {
    name: 'Jumping Jacks',
    description: 'A full body cardio exercise that increases heart rate and improves coordination.',
    muscleGroups: ['fullBody'],
    equipment: ['none'],
    difficulty: 'beginner',
    type: 'cardio',
    timeRequired: 5,
    imageUrl: 'https://example.com/jumping-jacks.jpg',
    videoUrl: 'https://example.com/jumping-jacks-video',
    tags: ['cardio', 'home workout']
  },
  {
    name: 'Mountain Climbers',
    description: 'A cardio exercise that also works the core, shoulders, and arms.',
    muscleGroups: ['core', 'shoulders', 'arms'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    type: 'cardio',
    timeRequired: 5,
    imageUrl: 'https://example.com/mountain-climbers.jpg',
    videoUrl: 'https://example.com/mountain-climbers-video',
    tags: ['cardio', 'core']
  },
  {
    name: 'Burpees',
    description: 'A full body exercise that combines a push-up, squat, and jump.',
    muscleGroups: ['fullBody'],
    equipment: ['bodyweight'],
    difficulty: 'advanced',
    type: 'cardio',
    timeRequired: 8,
    imageUrl: 'https://example.com/burpees.jpg',
    videoUrl: 'https://example.com/burpees-video',
    tags: ['cardio', 'full body']
  },
  
  // Flexibility Exercises
  {
    name: 'Static Stretching',
    description: 'Holding a position to lengthen muscles and improve flexibility.',
    muscleGroups: ['fullBody'],
    equipment: ['none'],
    difficulty: 'beginner',
    type: 'flexibility',
    timeRequired: 10,
    imageUrl: 'https://example.com/static-stretching.jpg',
    videoUrl: 'https://example.com/static-stretching-video',
    tags: ['flexibility', 'recovery']
  },
  {
    name: 'Yoga Flow',
    description: 'A sequence of yoga poses that improve flexibility, balance, and strength.',
    muscleGroups: ['fullBody'],
    equipment: ['none'],
    difficulty: 'intermediate',
    type: 'flexibility',
    timeRequired: 15,
    imageUrl: 'https://example.com/yoga-flow.jpg',
    videoUrl: 'https://example.com/yoga-flow-video',
    tags: ['flexibility', 'balance']
  },
  
  // Balance Exercises
  {
    name: 'Single Leg Stand',
    description: 'Standing on one leg to improve balance and stability.',
    muscleGroups: ['legs', 'core'],
    equipment: ['none'],
    difficulty: 'beginner',
    type: 'balance',
    timeRequired: 5,
    imageUrl: 'https://example.com/single-leg-stand.jpg',
    videoUrl: 'https://example.com/single-leg-stand-video',
    tags: ['balance', 'core']
  }
];

// Export the exercises data for use in other files
module.exports = { exercisesData };

// Only connect to the database and seed exercises if running this file directly
if (require.main === module) {
  // Connection to the database
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toasted';
  
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });

  // Function to seed exercises
  const seedExercises = async () => {
    try {
      // Clear existing exercises
      await Exercise.deleteMany({});
      console.log('Cleared existing exercises');

      // Insert new exercises
      const exercises = await Exercise.insertMany(exercisesData);
      console.log(`Added ${exercises.length} exercises to the database`);

      // Disconnect from MongoDB
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error seeding exercises:', error);
      mongoose.disconnect();
      process.exit(1);
    }
  };

  // Execute seeding
  seedExercises();
} 