/**
 * Utility module for nutrition-related calculations
 */

/**
 * Calculate recommended daily calories based on TDEE and fitness goal
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {string} goal - Fitness goal (weight_loss, weight_gain, muscle_building, etc.)
 * @returns {number} - Recommended daily calorie intake
 */
const calculateRecommendedCalories = (tdee, goal) => {
  switch (goal) {
    case 'weight_loss':
      return Math.round(tdee * 0.8); // 20% deficit
    case 'weight_gain':
    case 'muscle_building':
      return Math.round(tdee * 1.15); // 15% surplus
    case 'maintenance':
    case 'endurance':
    case 'general_health':
    default:
      return tdee;
  }
};

/**
 * Calculate macro distribution based on diet type and fitness goal
 * @param {string} dietType - Diet type (keto, vegetarian, etc.)
 * @param {string} goal - Fitness goal
 * @returns {Object} - Macro distribution in percentages { protein, carbs, fats }
 */
const calculateMacroDistribution = (dietType, goal) => {
  if (dietType === 'keto') {
    return {
      protein: 25,
      carbs: 5,
      fats: 70
    };
  } else if (goal === 'muscle_building') {
    return {
      protein: 30,
      carbs: 45,
      fats: 25
    };
  } else if (goal === 'weight_loss') {
    return {
      protein: 35,
      carbs: 35,
      fats: 30
    };
  } else {
    // Default balanced
    return {
      protein: 25,
      carbs: 50,
      fats: 25
    };
  }
};

/**
 * Calculate BMR (Basal Metabolic Rate) using the Mifflin-St Jeor Equation
 * @param {Object} userData - User data containing age, gender, weight, height
 * @returns {number} - BMR value
 */
const calculateBMR = (userData) => {
  const { weight, height, age, gender } = userData;
  
  if (!weight || !height || !age) {
    // Return default value if missing parameters
    return 1800;
  }
  
  // Mifflin-St Jeor Equation
  if (gender === 'female') {
    return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
  } else {
    return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
  }
};

/**
 * Calculate TDEE based on BMR and activity level
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level
 * @returns {number} - TDEE value
 */
const calculateTDEE = (bmr, activityLevel) => {
  const activityMultipliers = {
    'sedentary': 1.2,
    'lightly_active': 1.375,
    'moderately_active': 1.55,
    'very_active': 1.725,
    'extremely_active': 1.9
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1.55; // Default to moderately active
  return Math.round(bmr * multiplier);
};

/**
 * Calculate calories for a specific meal based on meal timing
 * @param {number} totalCalories - Total daily calories
 * @param {string} mealType - Type of meal (breakfast, lunch, dinner, snack)
 * @returns {number} - Calories for the specific meal
 */
const calculateMealCalories = (totalCalories, mealType) => {
  const mealDistribution = {
    'breakfast': 0.25, // 25% of daily calories
    'lunch': 0.35,     // 35% of daily calories
    'dinner': 0.3,     // 30% of daily calories
    'snack': 0.1       // 10% of daily calories
  };
  
  const percentage = mealDistribution[mealType] || 0.25; // Default to breakfast distribution
  return Math.round(totalCalories * percentage);
};

module.exports = {
  calculateRecommendedCalories,
  calculateMacroDistribution,
  calculateBMR,
  calculateTDEE,
  calculateMealCalories
}; 