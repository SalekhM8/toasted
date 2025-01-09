// models/Plan.js
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  notes: String,
  progression: String,
  tempo: String,
  rest: String,
  cues: [String]
});

const workoutDaySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  focus: { type: String, required: true },
  exercises: [exerciseSchema]
});

const workoutWeekSchema = [workoutDaySchema];

const workoutPlanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  frequency: { type: String, required: true, enum: ['1day', '2day', '3day', '4day'] },
  weeks: [workoutWeekSchema]
});

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timing: String,
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  ingredients: [String],
  instructions: [String],
  notes: String
});

const dietDaySchema = [mealSchema];

const dietPlanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  weekCycle: [dietDaySchema]
});

const userPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workoutPlanId: { type: String, required: false, ref: 'WorkoutPlan' },
  dietPlanId: { type: String, required: false, ref: 'DietPlan' },
  startDate: { type: Date, required: true },
  progress: {
    completedWorkouts: [Date],
    completedMeals: [{
      date: Date,
      mealNumber: Number
    }]
  }
}, { timestamps: true });

module.exports = {
    WorkoutPlan: mongoose.model('WorkoutPlan', workoutPlanSchema),
    DietPlan: mongoose.model('DietPlan', dietPlanSchema),
    UserPlan: mongoose.model('UserPlan', userPlanSchema)
  };