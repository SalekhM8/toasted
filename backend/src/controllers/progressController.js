// backend/src/controllers/progressController.js
const Progress = require('../models/Progress');
const WorkoutLog = require('../models/WorkoutLog');
const WorkoutSwapLog = require('../models/WorkoutSwapLog');
const UserPlan = require('../models/Plan').UserPlan;
const asyncHandler = require('express-async-handler');

const progressController = {
  logWeight: asyncHandler(async (req, res) => {
    const { weight } = req.body;
    
    if (!weight || isNaN(weight)) {
      res.status(400);
      throw new Error('Invalid weight value');
    }

    let progress = await Progress.findOne({ userId: req.user._id });
    
    if (!progress) {
      progress = new Progress({
        userId: req.user._id,
        weights: []
      });
    }

    progress.weights.push({ weight });
    await progress.save();

    res.json(progress.weights);
  }),

  getWeights: asyncHandler(async (req, res) => {
    const progress = await Progress.findOne({ userId: req.user._id });
    
    if (!progress) {
      return res.json({ weights: [] });
    }

    res.json({ weights: progress.weights });
  }),

  logCompletion: asyncHandler(async (req, res) => {
    const { type, itemId, planId } = req.body;
      
    let progress = await Progress.findOne({ userId: req.user._id });
    
    if (!progress) {
      progress = new Progress({ userId: req.user._id });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (type === 'workout') {
      const exists = progress.completedWorkouts.some(w => 
          w.date.toDateString() === today.toDateString() && w.workoutId === itemId
      );
      if (!exists) {
          progress.completedWorkouts.push({
              date: today,
              workoutId: itemId,
              planId
          });
      }
    } else if (type === 'meal') {
      const exists = progress.completedMeals.some(m => 
          m.date.toDateString() === today.toDateString() && m.mealId === itemId
      );
      if (!exists) {
          progress.completedMeals.push({
              date: today,
              mealId: itemId,
              planId
          });
      }
    }

    const lastUpdate = progress.streak.lastUpdated;
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastUpdate && lastUpdate.getTime() === today.getTime()) {
    } else if (!lastUpdate || lastUpdate.getTime() === yesterday.getTime()) {
      progress.streak.current = (progress.streak.current || 0) + 1;
    } else {
      progress.streak.current = 1;
    }
    progress.streak.lastUpdated = today;

    await progress.save();
    res.json(progress);
  }),

  getProgress: asyncHandler(async (req, res) => {
    const progress = await Progress.findOne({ userId: req.user._id });
    
    if (!progress) {
      return res.json({
        weights: [],
        completedWorkouts: [],
        completedMeals: [],
        streak: { current: 0, lastUpdated: null }
      });
    }

    res.json(progress);
  }),

  logExerciseCompletion: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
        exerciseName,
        workoutDate,
        weightLifted,
        weightUnit,
        repsCompleted,
        repsLeftInTank,
        painReported,
        painNotes,
        targetSets,
        targetReps
    } = req.body;

    if (!exerciseName || !workoutDate || !repsLeftInTank) {
        res.status(400);
        throw new Error('Missing required exercise log fields: exerciseName, workoutDate, repsLeftInTank');
    }

    const validRepsLeft = ["Couldn't complete all reps", "0 - reached failure", "1", "2", "3", "4+"];
    if (!validRepsLeft.includes(repsLeftInTank)) {
        res.status(400);
        throw new Error('Invalid value for repsLeftInTank');
    }

    if (weightLifted !== undefined && weightLifted !== null) {
        if (!weightUnit || !['kg', 'lbs'].includes(weightUnit)) {
            res.status(400);
            throw new Error('weightUnit (kg or lbs) is required when weightLifted is provided');
        }
        if (isNaN(parseFloat(weightLifted))) {
             res.status(400);
             throw new Error('Invalid value for weightLifted');
        }
    }
    
    const parsedDate = new Date(workoutDate);
    if (isNaN(parsedDate.getTime())) {
        res.status(400);
        throw new Error('Invalid workoutDate format. Please use ISO 8601 format.');
    }

    const userPlan = await UserPlan.findOne({
        userId: userId,
        startDate: { $lte: parsedDate }
    }).sort({ startDate: -1 });

    if (!userPlan || !userPlan.workoutPlanId) {
        console.warn(`WorkoutLog: Could not find active workout plan for user ${userId} on date ${workoutDate}`);
    }
    const workoutPlanId = userPlan?.workoutPlanId || 'UNKNOWN';

    const newLog = new WorkoutLog({
        userId,
        workoutPlanId,
        exerciseName,
        workoutDate: parsedDate,
        weightLifted: (weightLifted !== undefined && weightLifted !== null) ? parseFloat(weightLifted) : null,
        weightUnit: (weightLifted !== undefined && weightLifted !== null) ? weightUnit : null,
        repsCompleted,
        repsLeftInTank,
        painReported: painReported || false,
        painNotes: painNotes || null,
        targetSets: targetSets ? parseInt(targetSets) : null, 
        targetReps: targetReps || null
    });

    await newLog.save();

    console.log(`WorkoutLog created: User ${userId}, Exercise ${exerciseName}, Date ${parsedDate.toISOString()}`);
    res.status(201).json({ message: 'Exercise logged successfully', log: newLog });
  }),

  swapExercise: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { originalExerciseName, swappedExerciseName, workoutDate } = req.body;

    if (!originalExerciseName || !swappedExerciseName || !workoutDate) {
        res.status(400);
        throw new Error('Missing required exercise swap fields: originalExerciseName, swappedExerciseName, workoutDate');
    }

    if (originalExerciseName === swappedExerciseName) {
        res.status(400);
        throw new Error('Original and swapped exercise names cannot be the same.');
    }

    const parsedDate = new Date(workoutDate);
    if (isNaN(parsedDate.getTime())) {
        res.status(400);
        throw new Error('Invalid workoutDate format. Please use ISO 8601 format.');
    }

    const dateKey = new Date(Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate()));

    // For logging purposes only - this is not required for the swap to work
    const userPlan = await UserPlan.findOne({
        userId: userId,
        startDate: { $lte: dateKey }
    }).sort({ startDate: -1 });

    if (!userPlan || !userPlan.workoutPlanId) {
        console.warn(`WorkoutSwapLog: Could not find active workout plan for user ${userId} on date ${workoutDate}`);
    }
    const workoutPlanId = userPlan?.workoutPlanId || 'UNKNOWN';

    // Look for existing swaps for this exercise on this date
    const existingSwap = await WorkoutSwapLog.findOne({
        userId: userId,
        workoutDate: dateKey,
        originalExerciseName: originalExerciseName
    });

    if (existingSwap) {
        console.log(`Found existing swap for ${originalExerciseName} -> ${existingSwap.swappedExerciseName}, updating to ${swappedExerciseName}`);
    }

    // Important: Using findOneAndUpdate with upsert to create or update the swap record
    const updatedSwapLog = await WorkoutSwapLog.findOneAndUpdate(
        { 
            userId: userId, 
            workoutDate: dateKey, 
            originalExerciseName: originalExerciseName 
        }, 
        { 
            userId: userId, 
            workoutDate: dateKey, 
            originalExerciseName: originalExerciseName, 
            swappedExerciseName: swappedExerciseName, 
            workoutPlanId: workoutPlanId 
        },
        { 
            upsert: true, 
            new: true, 
            runValidators: true 
        }
    );

    console.log(`WorkoutSwapLog ${updatedSwapLog._id} upserted: User ${userId}, Date ${dateKey.toISOString()}, ${originalExerciseName} -> ${swappedExerciseName}`);
    
    // Return detailed info for debugging
    res.status(200).json({ 
        message: 'Exercise swap recorded successfully', 
        swapLog: updatedSwapLog,
        date: dateKey.toISOString(),
        originalExercise: originalExerciseName,
        newExercise: swappedExerciseName
    });
  }),

  // New function to get completed exercises
  getCompletedExercises: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;
    
    // Validate date parameters if provided
    const query = { userId };
    
    if (startDate) {
      const parsedStartDate = new Date(startDate);
      if (isNaN(parsedStartDate.getTime())) {
        res.status(400);
        throw new Error('Invalid startDate format. Please use ISO 8601 format (YYYY-MM-DD).');
      }
      query.workoutDate = { $gte: parsedStartDate };
    }
    
    if (endDate) {
      const parsedEndDate = new Date(endDate);
      if (isNaN(parsedEndDate.getTime())) {
        res.status(400);
        throw new Error('Invalid endDate format. Please use ISO 8601 format (YYYY-MM-DD).');
      }
      
      // If we already have a workoutDate query, add the endDate as $lte
      if (query.workoutDate) {
        query.workoutDate.$lte = parsedEndDate;
      } else {
        query.workoutDate = { $lte: parsedEndDate };
      }
    }
    
    // If no date parameters, default to retrieving the last 30 days
    if (!startDate && !endDate) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.workoutDate = { $gte: thirtyDaysAgo };
    }

    try {
      const completedExercises = await WorkoutLog.find(query)
        .sort({ workoutDate: -1 })
        .lean(); // Use lean() for better performance
      
      // Format the response data to be more frontend-friendly
      const formattedExercises = completedExercises.map(exercise => ({
        id: exercise._id,
        exerciseName: exercise.exerciseName,
        date: exercise.workoutDate.toISOString(),
        dateFormatted: exercise.workoutDate.toISOString().split('T')[0], // YYYY-MM-DD
        weightLifted: exercise.weightLifted,
        weightUnit: exercise.weightUnit,
        repsCompleted: exercise.repsCompleted,
        repsLeftInTank: exercise.repsLeftInTank,
        painReported: exercise.painReported,
        painNotes: exercise.painNotes
      }));
      
      res.json({
        count: formattedExercises.length,
        exercises: formattedExercises
      });
    } catch (error) {
      console.error('Error retrieving completed exercises:', error);
      res.status(500);
      throw new Error('Failed to retrieve completed exercises');
    }
  })
};

module.exports = progressController;