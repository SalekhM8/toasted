const mongoose = require('mongoose');
const { calculateRecommendedCalories, calculateMacroDistribution } = require('../utils/nutritionCalculator');

const userPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Health conditions and nutritional needs
  healthConditions: [{
    type: String,
    enum: [
      // Diseases
      'diabetes', 'hypertension', 'heart_disease', 'arthritis', 'ibs', 'gerd', 'high_cholesterol', 'high_triglycerides',
      // Deficiencies
      'iron_deficiency', 'vitamin_d_deficiency', 'b12_deficiency', 'calcium_deficiency', 'zinc_deficiency',
      // Allergies/Restrictions
      'gluten_intolerance', 'lactose_intolerance', 'nut_allergy', 'shellfish_allergy'
    ]
  }],
  
  // Fitness goals
  goal: {
    type: String,
    enum: ['weight_loss', 'weight_gain', 'muscle_building', 'endurance', 'maintenance', 'general_health'],
    required: true
  },
  
  bodyFocusAreas: [{
    type: String,
    enum: ['arms', 'abs', 'back', 'chest', 'legs', 'glutes', 'shoulders', 'full_body']
  }],
  
  // Dietary preferences
  dietType: {
    type: String,
    enum: [
      'omnivore', 'flexitarian', 'pescatarian', 'vegetarian', 'vegan', 
      'keto', 'paleo', 'mediterranean', 'halal', 'kosher'
    ],
    required: true
  },
  
  cuisinePreferences: [{
    type: String,
    enum: [
      'american', 'italian', 'mexican', 'asian', 'indian', 'mediterranean',
      'middle_eastern', 'thai', 'japanese', 'french', 'korean', 'spanish'
    ]
  }],
  
  excludedIngredients: [{
    type: String,
    enum: [
      'nuts', 'dairy', 'gluten', 'soy', 'shellfish', 'eggs', 'pork', 
      'beef', 'nightshades', 'processed_sugar', 'alcohol'
    ]
  }],
  
  // Lifestyle factors
  cookingTime: {
    type: String,
    enum: ['minimal', 'moderate', 'extended'],
    required: true
  },
  
  cookingSkill: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  
  mealPrep: {
    type: Boolean,
    default: false
  },
  
  budget: {
    type: String,
    enum: ['budget', 'moderate', 'premium'],
    required: true
  },
  
  // Auto-generated data
  bmr: {
    type: Number
  },
  
  tdee: {
    type: Number
  },
  
  recommendedCalories: {
    type: Number,
    required: true
  },
  
  macroDistribution: {
    protein: { type: Number }, // percentage
    carbs: { type: Number },   // percentage
    fats: { type: Number }     // percentage
  }
}, {
  timestamps: true
});

// Calculate recommended calories based on goal using utility functions
userPreferenceSchema.pre('save', function(next) {
  // If tdee is not provided, skip this step
  if (!this.tdee) {
    next();
    return;
  }
  
  // Use utility function to calculate recommended calories
  this.recommendedCalories = calculateRecommendedCalories(this.tdee, this.goal);
  
  // Use utility function to calculate macro distribution
  this.macroDistribution = calculateMacroDistribution(this.dietType, this.goal);
  
  next();
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema); 