const Exercise = require('../models/Exercise');
const { WorkoutPlan, UserPlan } = require('../models/Plan');
const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * Generate a custom training plan based on user questionnaire responses
 * SIMPLIFIED VERSION for initial implementation
 */
exports.generateCustomPlan = async (req, res) => {
  try {
    console.log('Generating custom plan with params:', req.body);
    const { 
      fitnessLevel = 'beginner', 
      fitnessGoal = 'general_fitness', 
      workoutFrequency = 3,
      availableEquipment = [],
      focusAreas = []
    } = req.body;

    const userId = req.user.id;

    // Validate only the most essential inputs
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    console.log('Finding exercises for custom plan...');
    
    // SIMPLIFIED: Get any 20-40 exercises from the database
    // This ensures we have something to work with regardless of data structure
    let exercises = [];
    
    // Try to apply some minimal filtering if possible
    try {
      const query = {};
      
      // Only apply filters if they're provided and non-empty
      if (availableEquipment && availableEquipment.length > 0) {
        // Make a loose equipment filter with $or to increase chances of matches
        query.$or = [
          { equipment: { $in: availableEquipment } },
          { equipment: 'bodyweight' },
          { equipment: 'none' }
        ];
      }
      
      // Add difficulty as a loose filter if available
      if (fitnessLevel) {
        // Use $or to increase chances of finding exercises
        if (!query.$or) query.$or = [];
        query.$or.push(
          { difficulty: fitnessLevel.toLowerCase() },
          { difficulty: 'beginner' } // Always include beginner as fallback
        );
      }
      
      console.log('Exercise query:', JSON.stringify(query));
      
      // First attempt with filters
      exercises = await Exercise.find(query).limit(40);
      console.log(`Found ${exercises.length} exercises with filters`);
      
      // If we don't have enough exercises, remove filters
      if (exercises.length < 10) {
        console.log('Not enough exercises found with filters, getting any exercises');
        exercises = await Exercise.find({}).limit(40);
        console.log(`Found ${exercises.length} exercises without filters`);
      }
    } catch (error) {
      console.error('Error finding exercises:', error);
      // Fallback - try to get any exercises
      exercises = await Exercise.find({}).limit(40);
      console.log(`Found ${exercises.length} exercises in fallback mode`);
    }
    
    // If still no exercises, return error
    if (!exercises || exercises.length === 0) {
      console.error('No exercises found in database');
      return res.status(404).json({
        success: false,
        message: 'No exercises found in database'
      });
    }

    // SIMPLIFIED: Create a basic weekly plan with random exercises
    console.log('Creating weekly plan');
    const weeklyPlan = createSimpleWeeklyPlan(exercises, parseInt(workoutFrequency) || 3);

    // Create a unique ID for the custom plan
    // IMPORTANT: Use 'custom' as the ID to match the frontend's expectation
    const customPlanId = new mongoose.Types.ObjectId();
    
    // Create the plan document with minimal metadata
    const planName = `Custom ${fitnessGoal.replace('_', ' ')} Plan`;
    console.log(`Creating plan: ${planName}`);
    
    // Map weeklyPlan to the expected weeks structure
    // The frontend expects an array of week arrays, where each week is an array of day objects
    const organizedWeeks = [];
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    // Create a single week array
    const weekArray = daysOfWeek.map((day, index) => {
      const dayWorkout = weeklyPlan[day];
      return {
        dayNumber: index + 1,
        focus: dayWorkout.name,
        exercises: dayWorkout.exercises.map(ex => ({
          name: ex.exerciseDetails.name,
          sets: ex.sets,
          reps: ex.reps.toString(),
          rest: ex.rest.toString(),
          notes: ex.exerciseDetails.description || '',
          cues: []
        }))
      };
    });
    
    // Extract just the workout days (non-rest days)
    const workoutDaysOnly = weekArray.filter(day => 
      day.focus !== 'Rest Day' && day.exercises && day.exercises.length > 0
    );
    
    console.log(`Filtered to ${workoutDaysOnly.length} actual workout days`);
    
    // For custom plans, we need a clean set of workout days without the empty rest days
    // This ensures the schedule can properly distribute them
    if (workoutDaysOnly.length > 0) {
      // Add just the workout days as the first week
      organizedWeeks.push(workoutDaysOnly);
    } else {
      // Fallback to the complete week if somehow we don't have workout days
      organizedWeeks.push(weekArray);
    }
    
    console.log('Structured week plan with days:', workoutDaysOnly.length);
    
    // Create a new workout plan with ID 'custom' to match frontend expectations
    const newPlan = new WorkoutPlan({
      _id: customPlanId,
      id: 'custom', // CRITICAL: Use 'custom' as the ID to match what frontend expects
      name: planName,
      frequency: workoutFrequency <= 1 ? '1day' :
                 workoutFrequency <= 2 ? '2day' :
                 workoutFrequency <= 3 ? '3day' : '4day',
      weeks: organizedWeeks,
      metadata: {
        customPlan: true,
        fitnessLevel,
        fitnessGoal,
        workoutFrequency,
        createdAt: new Date(),
        userId // Store userId in metadata for reference
      }
    });

    // Check for existing custom plan and delete it first
    try {
      const existingCustomPlan = await WorkoutPlan.findOne({ id: 'custom' });
      if (existingCustomPlan) {
        console.log(`Removing existing custom plan with ID: ${existingCustomPlan._id}`);
        await WorkoutPlan.deleteOne({ _id: existingCustomPlan._id });
      }
    } catch (err) {
      console.log('No existing custom plan found or error checking:', err.message);
    }

    // Save the plan
    console.log('Saving plan to database');
    await newPlan.save();
    console.log(`Saved plan with ID 'custom' and _id: ${newPlan._id}`);

    // Create or update the user's plan selection in UserPlan
    console.log('Updating user active plans');
    const existingUserPlan = await UserPlan.findOne({ userId });
    
    if (existingUserPlan) {
      // Update existing plan
      existingUserPlan.workoutPlanId = 'custom'; // Use 'custom' to match frontend expectation
      existingUserPlan.startDate = new Date();
      await existingUserPlan.save();
      console.log(`Updated existing user plan to use workoutPlanId: 'custom'`);
    } else {
      // Create new user plan
      const userPlan = await UserPlan.create({
        userId,
        workoutPlanId: 'custom', // Use 'custom' to match frontend expectation
        startDate: new Date(),
        progress: {
          completedWorkouts: [],
          completedMeals: []
        }
      });
      console.log(`Created new user plan with workoutPlanId: 'custom', ID: ${userPlan._id}`);
    }

    // Also update the user document for backward compatibility
    await User.findByIdAndUpdate(userId, {
      $set: { 'activePlans.workout': newPlan._id }
    });
    console.log(`Updated user ${userId} with active plan`);

    console.log('Custom plan created successfully');
    return res.status(201).json({
      success: true,
      message: 'Custom workout plan created successfully',
      plan: newPlan
    });

  } catch (error) {
    console.error('Error generating custom plan:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating custom plan',
      error: error.message
    });
  }
};

/**
 * SIMPLIFIED function to create a basic weekly workout plan
 */
function createSimpleWeeklyPlan(exercises, frequency = 3) {
  const weeklyPlan = {};
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Distribute workouts evenly throughout the week
  const workoutDays = [];
  
  // Select days based on frequency (limit to 3-5 for simplicity)
  const safeFrequency = Math.min(Math.max(frequency, 1), 6);
  
  // Instead of specific days, just evenly distribute workouts
  // This way the frontend will space them based on the starting day
  for (let i = 0; i < safeFrequency; i++) {
    // Calculate which day of the week this would be (0-6)
    const dayIndex = Math.floor(i * (7 / safeFrequency)) % 7;
    workoutDays.push(daysOfWeek[dayIndex]);
  }

  // Create focus names
  const focusNames = [
    'Upper Body', 'Lower Body', 'Full Body', 
    'Push Day', 'Pull Day', 'Legs Day', 'Core'
  ];

  // For each workout day, create a simple workout
  workoutDays.forEach((day, index) => {
    // Get 3-5 random exercises
    const dailyExercises = [];
    const exerciseCount = Math.min(5, Math.floor(exercises.length / workoutDays.length));
    
    // Use different exercises for each day if possible
    const startIndex = index * exerciseCount % exercises.length;
    
    for (let i = 0; i < exerciseCount; i++) {
      const exerciseIndex = (startIndex + i) % exercises.length;
      const exercise = exercises[exerciseIndex];
      
      if (exercise) {
        // Add exercise with standard sets/reps
        dailyExercises.push({
          // Handle both Object ID and regular ID
          exercise: exercise._id || exercise.id,
          exerciseDetails: {
            name: exercise.name || `Exercise ${i+1}`,
            description: exercise.description || '',
            imageUrl: exercise.imageUrl || '',
            videoUrl: exercise.videoUrl || ''
          },
          sets: 3,
          reps: 10,
          rest: 60,
          completed: false
        });
      }
    }
    
    // Get a focus name (rotate through them)
    const focusName = focusNames[index % focusNames.length];
    
    weeklyPlan[day] = {
      name: focusName,
      exercises: dailyExercises
    };
  });
  
  // Set rest days
  daysOfWeek.forEach(day => {
    if (!weeklyPlan[day]) {
      weeklyPlan[day] = {
        name: 'Rest Day',
        exercises: []
      };
    }
  });
  
  // Log out the workout days and their exercises for debugging
  console.log(`Created ${Object.keys(weeklyPlan).filter(day => weeklyPlan[day].name !== 'Rest Day').length} workout days:`);
  Object.keys(weeklyPlan).forEach(day => {
    const dayPlan = weeklyPlan[day];
    if (dayPlan.name !== 'Rest Day') {
      console.log(`  ${day}: ${dayPlan.name} - ${dayPlan.exercises.length} exercises`);
    }
  });
  
  return weeklyPlan;
}

/**
 * Get user's custom training plan
 */
exports.getUserCustomPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the user's custom workout plan - use id: 'custom' to match our simplified ID
    const customPlan = await WorkoutPlan.findOne({ 
      'metadata.customPlan': true,
      id: 'custom'
    });
    
    if (!customPlan) {
      return res.status(404).json({
        success: false,
        message: 'No custom plan found for this user'
      });
    }
    
    return res.status(200).json({
      success: true,
      plan: customPlan
    });
    
  } catch (error) {
    console.error('Error fetching custom plan:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching custom plan',
      error: error.message
    });
  }
}; 