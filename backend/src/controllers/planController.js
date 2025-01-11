const asyncHandler = require('express-async-handler');
const { WorkoutPlan, DietPlan, UserPlan } = require('../models/Plan');

const planController = {
  selectPlan: asyncHandler(async (req, res) => {
    const { workoutPlanId, dietPlanId, startDate } = req.body;
    const userId = req.user._id;
  
    console.log('Selecting plan:', { workoutPlanId, dietPlanId, startDate, userId });
  
    // Check if user already has a plan
    let userPlan = await UserPlan.findOne({ userId });
    console.log('Existing user plan:', userPlan);
  
    let planData = {
      userId,
      startDate: startDate || new Date(),
      progress: {
        completedWorkouts: [],
        completedMeals: []
      }
    };
  
    // Only add workout or diet plan if they're present
    if (workoutPlanId) planData.workoutPlanId = workoutPlanId;
    if (dietPlanId) planData.dietPlanId = dietPlanId;
  
    if (userPlan) {
      // Update only the fields that are present
      if (workoutPlanId !== undefined) userPlan.workoutPlanId = workoutPlanId;
      if (dietPlanId !== undefined) userPlan.dietPlanId = dietPlanId;
      userPlan.startDate = startDate || new Date();
      userPlan.progress = {
        completedWorkouts: [],
        completedMeals: []
      };
    } else {
      // Create new plan with only the present fields
      userPlan = new UserPlan(planData);
    }
  
    await userPlan.save();
    console.log('Saved user plan:', userPlan);
    res.status(200).json(userPlan);
  }),

  getTodaysPlan: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    console.log('Getting plan for user:', userId);
    
    const userPlan = await UserPlan.findOne({ userId });
    console.log('Found user plan:', userPlan);

    if (!userPlan) {
      res.status(404);
      throw new Error('No plan found');
    }

    console.log('Looking for plans with IDs:', {
      workout: userPlan.workoutPlanId,
      diet: userPlan.dietPlanId
    });

    // Try fetching ALL plans to see what we have
    const allWorkoutPlans = await WorkoutPlan.find({});
    const allDietPlans = await DietPlan.find({});
    
    console.log('Available plans:', {
      workouts: allWorkoutPlans.map(w => w.id),
      diets: allDietPlans.map(d => d.id)
    });

    // Load the full plans
    const workoutPlan = await WorkoutPlan.findOne({ id: userPlan.workoutPlanId });
    const dietPlan = await DietPlan.findOne({ id: userPlan.dietPlanId });

    console.log('Found plans:', {
      workoutPlan: !!workoutPlan,
      dietPlan: !!dietPlan
    });

    // Calculate current day based on start date
    const startDate = new Date(userPlan.startDate);
    const today = new Date();
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    // Get today's workout (if it's a workout day)
    const weekNumber = Math.floor(daysSinceStart / 7) % 6; // 6-week cycle
    const dayNumber = daysSinceStart % 7;

    // Check if it's a workout day based on frequency
    let todaysWorkout = null;
    const workoutDays = workoutPlan?.weeks[weekNumber];
    console.log('Workout calculation:', {
      weekNumber,
      dayNumber,
      hasWorkoutDays: !!workoutDays
    });

    if (workoutDays) {
      for (const workout of workoutDays) {
        if (workout.dayNumber === (dayNumber + 1)) {
          todaysWorkout = workout;
          break;
        }
      }
    }

    // Get today's meals (2-week cycle)
    const todaysMeals = dietPlan?.weekCycle[dayNumber % 14];

    const todaysPlan = {
      date: today,
      workout: todaysWorkout,
      meals: todaysMeals,
      progress: {
        completedWorkouts: userPlan.progress.completedWorkouts.filter(
          date => date.toDateString() === today.toDateString()
        ),
        completedMeals: userPlan.progress.completedMeals.filter(
          meal => meal.date.toDateString() === today.toDateString()
        )
      }
    };

    res.status(200).json(todaysPlan);
  }),

  getWeekPlan: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    console.log('Getting week plan for user:', userId);
    
    const userPlan = await UserPlan.findOne({ userId });
    console.log('Found user plan:', userPlan);

    if (!userPlan) {
      res.status(404);
      throw new Error('No plan found');
    }

    const workoutPlan = await WorkoutPlan.findOne({ id: userPlan.workoutPlanId });
    const dietPlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
    
    console.log('Found plans for week:', {
      workoutPlan: !!workoutPlan,
      dietPlan: !!dietPlan
    });

    const startDate = new Date(userPlan.startDate);
    const today = new Date();
    const weekPlan = [];

    // Generate 7 days of plans
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.floor(daysSinceStart / 7) % 6;
      const dayNumber = daysSinceStart % 7;

      let workout = null;
      const workoutDays = workoutPlan?.weeks[weekNumber];
      if (workoutDays) {
        workout = workoutDays.find(w => w.dayNumber === (dayNumber + 1));
      }

      weekPlan.push({
        date,
        workout,
        meals: dietPlan?.weekCycle[dayNumber % 14],
        progress: {
          completedWorkouts: userPlan.progress.completedWorkouts.filter(
            d => d.toDateString() === date.toDateString()
          ),
          completedMeals: userPlan.progress.completedMeals.filter(
            meal => meal.date.toDateString() === date.toDateString()
          )
        }
      });
    }

    res.status(200).json(weekPlan);
  }),

  completeWorkout: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { date } = req.body;

    const userPlan = await UserPlan.findOne({ userId });
    if (!userPlan) {
      res.status(404);
      throw new Error('No plan found');
    }

    // Add to completed workouts if not already completed
    const completionDate = new Date(date);
    const alreadyCompleted = userPlan.progress.completedWorkouts.some(
      d => d.toDateString() === completionDate.toDateString()
    );

    if (!alreadyCompleted) {
      userPlan.progress.completedWorkouts.push(completionDate);
      await userPlan.save();
    }

    res.status(200).json({ message: 'Workout marked as complete' });
  }),

  // Add this to your existing planController object
  modifyPlan: asyncHandler(async (req, res) => {
    const { workoutPlanId, dietPlanId } = req.body;
    const userId = req.user._id;
  
    const userPlan = await UserPlan.findOne({ userId });
  
    if (!userPlan) {
      res.status(404);
      throw new Error('No active plan found');
    }
  
    // Update the plan
    if (workoutPlanId !== undefined) userPlan.workoutPlanId = workoutPlanId;
    if (dietPlanId !== undefined) userPlan.dietPlanId = dietPlanId;
  
    // Save the updated plan
    await userPlan.save();
  
    res.status(200).json({
      message: 'Plan updated successfully',
      plan: userPlan
    });
  }),

  completeMeal: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { date, mealNumber } = req.body;

    const userPlan = await UserPlan.findOne({ userId });
    if (!userPlan) {
      res.status(404);
      throw new Error('No plan found');
    }

    // Add to completed meals if not already completed
    const completionDate = new Date(date);
    const alreadyCompleted = userPlan.progress.completedMeals.some(
      meal => 
        meal.date.toDateString() === completionDate.toDateString() &&
        meal.mealNumber === mealNumber
    );

    if (!alreadyCompleted) {
      userPlan.progress.completedMeals.push({
        date: completionDate,
        mealNumber
      });
      await userPlan.save();
    }

    res.status(200).json({ message: 'Meal marked as complete' });
  })
};

module.exports = { planController };