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

const micronutrientsSchema = new mongoose.Schema({
  vitamins: {
    a: { type: Number, default: 0 }, // in IU
    c: { type: Number, default: 0 }, // in mg
    d: { type: Number, default: 0 }, // in IU
    e: { type: Number, default: 0 }, // in mg
    b1: { type: Number, default: 0 }, // in mg
    b2: { type: Number, default: 0 }, // in mg
    b3: { type: Number, default: 0 }, // in mg
    b6: { type: Number, default: 0 }, // in mg
    b12: { type: Number, default: 0 }, // in mcg
    folate: { type: Number, default: 0 } // in mcg
  },
  minerals: {
    calcium: { type: Number, default: 0 }, // in mg
    iron: { type: Number, default: 0 }, // in mg
    magnesium: { type: Number, default: 0 }, // in mg
    potassium: { type: Number, default: 0 }, // in mg
    zinc: { type: Number, default: 0 }, // in mg
    sodium: { type: Number, default: 0 } // in mg
  }
}, { _id: false });

// Schema for structured ingredients
const structuredIngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { 
    type: String, 
    enum: ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving'],
    required: true 
  },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  // Reference values for nutrition scaling
  referenceQuantity: { type: Number },
  referenceCalories: { type: Number },
  referenceProtein: { type: Number },
  referenceCarbs: { type: Number },
  referenceFats: { type: Number },
  // Optional reference to food item
  foodItemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FoodItem' 
  },
  // For backward compatibility
  originalString: String
}, { _id: false });

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timing: String,
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  micronutrients: { type: micronutrientsSchema, default: () => ({}) },
  // Keep original string-based ingredients for backward compatibility
  ingredients: [String],
  // Add structured ingredients
  structuredIngredients: [structuredIngredientSchema],
  instructions: [String],
  notes: String,
  category: { 
    type: String, 
    enum: ['home-cooked', 'restaurant', 'fast-food', 'takeout'], 
    default: 'home-cooked' 
  },
  // Track whether this meal has been customized by the user
  isCustomized: { type: Boolean, default: false },
  // Track when this meal was last modified
  lastModified: { type: Date }
});

const dietDaySchema = [mealSchema];

const dietPlanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  weekCycle: [dietDaySchema]
});

// New schema for custom diet plans with swapped meals
const customDietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  basePlanId: { type: String, required: true }, // Reference to original plan
  weekCycle: [dietDaySchema]
});

const userPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workoutPlanId: { type: String, required: false, ref: 'WorkoutPlan' },
  dietPlanId: { type: String, required: false, ref: 'DietPlan' },
  customDietPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomDietPlan' },
  startDate: { type: Date, required: true },
  progress: {
    completedWorkouts: [Date],
    completedMeals: [{
      date: Date,
      mealNumber: Number
    }]
  }
}, { timestamps: true });

const singleMealSchema = new mongoose.Schema({
  ...mealSchema.obj,
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

module.exports = {
  WorkoutPlan: mongoose.model('WorkoutPlan', workoutPlanSchema),
  DietPlan: mongoose.model('DietPlan', dietPlanSchema),
  UserPlan: mongoose.model('UserPlan', userPlanSchema),
  CustomDietPlan: mongoose.model('CustomDietPlan', customDietPlanSchema),
  Meal: mongoose.model('Meal', singleMealSchema),
  // Export schemas for reuse
  micronutrientsSchema
};