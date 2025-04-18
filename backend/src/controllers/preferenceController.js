const asyncHandler = require('express-async-handler');
const { Meal, CustomDietPlan, UserPlan } = require('../models/Plan');
const UserPreference = require('../models/UserPreference');
const { 
  calculateRecommendedCalories,
  calculateMacroDistribution,
  calculateBMR,
  calculateTDEE
} = require('../utils/nutritionCalculator');

// @desc    Save user preferences from questionnaire
// @route   POST /api/plans/preferences
// @access  Private
const saveUserPreferences = asyncHandler(async (req, res) => {
  const {
    healthConditions,
    goal,
    bodyFocusAreas,
    dietType,
    cuisinePreferences,
    excludedIngredients,
    cookingTime,
    cookingSkill,
    mealPrep,
    budget,
    bmr,
    tdee
  } = req.body;
  
  // Validate required fields
  if (!goal || !dietType || !cookingTime || !cookingSkill || !budget) {
    res.status(400);
    throw new Error('Please provide all required preferences');
  }
  
  // Check if user already has preferences
  let userPreferences = await UserPreference.findOne({ userId: req.user._id });
  
  if (userPreferences) {
    // Update existing preferences
    userPreferences.healthConditions = healthConditions || [];
    userPreferences.goal = goal;
    userPreferences.bodyFocusAreas = bodyFocusAreas || [];
    userPreferences.dietType = dietType;
    userPreferences.cuisinePreferences = cuisinePreferences || [];
    userPreferences.excludedIngredients = excludedIngredients || [];
    userPreferences.cookingTime = cookingTime;
    userPreferences.cookingSkill = cookingSkill;
    userPreferences.mealPrep = mealPrep || false;
    userPreferences.budget = budget;
    
    // Only update these if provided
    if (bmr) userPreferences.bmr = bmr;
    if (tdee) userPreferences.tdee = tdee;
    
    // Save updated preferences
    await userPreferences.save();
  } else {
    // Calculate recommended calories (default to 2000 if no tdee provided)
    const recommendedCalories = tdee ? 
      calculateRecommendedCalories(tdee, goal) : 
      2000;
    
    // Create new preferences
    userPreferences = await UserPreference.create({
      userId: req.user._id,
      healthConditions: healthConditions || [],
      goal,
      bodyFocusAreas: bodyFocusAreas || [],
      dietType,
      cuisinePreferences: cuisinePreferences || [],
      excludedIngredients: excludedIngredients || [],
      cookingTime,
      cookingSkill,
      mealPrep: mealPrep || false,
      budget,
      bmr: bmr || null,
      tdee: tdee || null,
      recommendedCalories
    });
  }
  
  res.status(201).json(userPreferences);
});

// @desc    Get user preferences
// @route   GET /api/plans/preferences
// @access  Private
const getUserPreferences = asyncHandler(async (req, res) => {
  const userPreferences = await UserPreference.findOne({ userId: req.user._id });
  
  if (!userPreferences) {
    res.status(404);
    throw new Error('User preferences not found');
  }
  
  res.json(userPreferences);
});

// @desc    Generate custom meal plan based on preferences
// @route   POST /api/plans/generate-custom-plan
// @access  Private
const generateCustomPlan = asyncHandler(async (req, res) => {
  // Get user preferences
  const userPreferences = await UserPreference.findOne({ userId: req.user._id });
  
  if (!userPreferences) {
    res.status(404);
    throw new Error('Please complete preference questionnaire first');
  }
  
  // Build the query object for MongoDB filtering
  const query = buildMealQueryFromPreferences(userPreferences);
  
  console.log('Generated query for meal filtering:', JSON.stringify(query, null, 2));
  
  // Execute primary query to get best matching meals
  const optimalMeals = await Meal.find(query)
    .limit(30) // Limit to top 30 matches for performance
    .exec();
  
  console.log(`Found ${optimalMeals.length} meals matching all criteria`);
  
  let filteredMeals = [...optimalMeals];
  
  // Check if we have enough meals to create a plan
  if (filteredMeals.length < 21) { // We need at least 21 meals for a varied week (3 meals x 7 days)
    console.log('Not enough optimal meals found, relaxing some constraints');
    
    // Build a relaxed query with fewer constraints
    const relaxedQuery = buildRelaxedMealQuery(userPreferences);
    
    // Get additional meals with relaxed criteria, excluding ones we already have
    const excludeIds = filteredMeals.map(meal => meal._id);
    const additionalMeals = await Meal.find({
      ...relaxedQuery,
      _id: { $nin: excludeIds }
    })
    .limit(30)
    .exec();
    
    console.log(`Found ${additionalMeals.length} additional meals with relaxed criteria`);
    
    // Combine the meals
    filteredMeals = [...filteredMeals, ...additionalMeals];
  }
  
  // Apply preference-based sorting to prioritize meals
  filteredMeals = applySortingPreferences(filteredMeals, userPreferences);
  
  // Create a weekly cycle of meals
  const weekCycle = createWeeklyCycle(filteredMeals, userPreferences.recommendedCalories);
  
  // Create a custom diet plan
  const customDietPlan = new CustomDietPlan({
    userId: req.user._id,
    basePlanId: 'custom', // This is a fully custom plan
    weekCycle
  });
  
  await customDietPlan.save();
  
  // Update or create user plan
  let userPlan = await UserPlan.findOne({ userId: req.user._id });
  
  if (userPlan) {
    userPlan.customDietPlanId = customDietPlan._id;
    await userPlan.save();
  } else {
    userPlan = await UserPlan.create({
      userId: req.user._id,
      customDietPlanId: customDietPlan._id,
      startDate: new Date()
    });
  }
  
  res.status(201).json({
    message: 'Custom plan generated successfully',
    planId: customDietPlan._id
  });
});

// Helper function to build MongoDB query from user preferences
const buildMealQueryFromPreferences = (userPreferences) => {
  const query = {};
  
  // Diet type filters
  if (userPreferences.dietType) {
    if (['vegetarian', 'vegan', 'pescatarian'].includes(userPreferences.dietType)) {
      query['dietaryTags'] = userPreferences.dietType;
    } else if (userPreferences.dietType === 'keto') {
      query['nutritionalTags'] = 'low-carb';
    } else if (userPreferences.dietType === 'paleo') {
      query['nutritionalTags'] = 'paleo-friendly';
    }
  }
  
  // Excluded ingredients
  if (userPreferences.excludedIngredients && userPreferences.excludedIngredients.length > 0) {
    const excludedTags = userPreferences.excludedIngredients
      .map(excluded => mapExcludedIngredientToDietaryTag(excluded))
      .filter(tag => tag !== null);
    
    if (excludedTags.length > 0) {
      // For excluded tags, we need meals that don't have these tags
      if (!query['dietaryTags']) {
        query['dietaryTags'] = { $not: { $in: excludedTags } };
      } else {
        // We already have dietary tags criteria, so we need to combine them
        const existingTag = query['dietaryTags'];
        query['dietaryTags'] = {
          $all: [existingTag],
          $not: { $in: excludedTags }
        };
      }
    }
  }
  
  // Health conditions
  if (userPreferences.healthConditions && userPreferences.healthConditions.length > 0) {
    const healthTags = userPreferences.healthConditions
      .map(condition => mapHealthConditionToSuitableForTag(condition))
      .filter(tag => tag !== null);
    
    if (healthTags.length > 0) {
      query['suitableFor'] = { $in: healthTags };
    }
  }
  
  // Cooking skill level
  if (userPreferences.cookingSkill) {
    const maxSkillLevel = SKILL_LEVEL_MAP[userPreferences.cookingSkill];
    const allowedSkillLevels = Object.keys(SKILL_LEVEL_MAP)
      .filter(skill => SKILL_LEVEL_MAP[skill] <= maxSkillLevel);
    
    query['preparation.difficulty'] = { $in: allowedSkillLevels };
  }
  
  // Cooking time
  if (userPreferences.cookingTime) {
    let maxTime = 180; // Default to maximum
    
    if (userPreferences.cookingTime === 'minimal') {
      maxTime = 15;
    } else if (userPreferences.cookingTime === 'moderate') {
      maxTime = 30;
    }
    
    query['preparation.time'] = { $lte: maxTime };
  }
  
  // Budget tier
  if (userPreferences.budget) {
    const maxBudgetLevel = BUDGET_TIER_MAP[userPreferences.budget];
    const allowedBudgetLevels = Object.keys(BUDGET_TIER_MAP)
      .filter(budget => BUDGET_TIER_MAP[budget] <= maxBudgetLevel);
    
    query['budgetTier'] = { $in: allowedBudgetLevels };
  }
  
  return query;
};

// Helper function to build a relaxed query when not enough meals match all criteria
const buildRelaxedMealQuery = (userPreferences) => {
  // Start with only the essential constraints
  const relaxedQuery = {};
  
  // Always keep dietary type constraints (vegetarian, vegan, etc.)
  if (userPreferences.dietType) {
    if (['vegetarian', 'vegan', 'pescatarian'].includes(userPreferences.dietType)) {
      relaxedQuery['dietaryTags'] = userPreferences.dietType;
    }
  }
  
  // Always keep excluded ingredients for allergies/intolerances
  if (userPreferences.excludedIngredients && userPreferences.excludedIngredients.length > 0) {
    const excludedTags = userPreferences.excludedIngredients
      .map(excluded => mapExcludedIngredientToDietaryTag(excluded))
      .filter(tag => tag !== null);
    
    if (excludedTags.length > 0) {
      if (!relaxedQuery['dietaryTags']) {
        relaxedQuery['dietaryTags'] = { $not: { $in: excludedTags } };
      } else {
        const existingTag = relaxedQuery['dietaryTags'];
        relaxedQuery['dietaryTags'] = {
          $all: [existingTag],
          $not: { $in: excludedTags }
        };
      }
    }
  }
  
  // Relax cooking time and skill level constraints
  
  return relaxedQuery;
};

// Helper function to apply preference-based sorting
const applySortingPreferences = (meals, userPreferences) => {
  // Create a scoring function to rank meals by preference match
  const scoreMeal = (meal) => {
    let score = 0;
    
    // Prioritize meals based on cuisine preferences
    if (userPreferences.cuisinePreferences && userPreferences.cuisinePreferences.length > 0) {
      if (meal.cuisine && userPreferences.cuisinePreferences.includes(meal.cuisine)) {
        score += 3;
      }
    }
    
    // Prioritize meal-prep friendly meals if user prefers that
    if (userPreferences.mealPrep && meal.preparation && meal.preparation.mealPrepFriendly) {
      score += 2;
    }
    
    // Prioritize meals that match health conditions
    if (userPreferences.healthConditions && userPreferences.healthConditions.length > 0) {
      const healthTags = userPreferences.healthConditions
        .map(condition => mapHealthConditionToSuitableForTag(condition))
        .filter(tag => tag !== null);
      
      if (meal.suitableFor) {
        const matchCount = meal.suitableFor.filter(tag => healthTags.includes(tag)).length;
        score += matchCount * 1.5;
      }
    }
    
    return score;
  };
  
  // Score and sort meals
  return [...meals].sort((a, b) => {
    return scoreMeal(b) - scoreMeal(a);
  });
};

// Helper function to map excluded ingredients to dietary tags
const mapExcludedIngredientToDietaryTag = (ingredient) => {
  const map = {
    'nuts': 'nut-free',
    'dairy': 'dairy-free',
    'gluten': 'gluten-free',
    'soy': 'soy-free',
    'eggs': 'egg-free'
  };
  return map[ingredient] || null;
};

// Helper function to map health conditions to suitable-for tags
const mapHealthConditionToSuitableForTag = (condition) => {
  const map = {
    'diabetes': 'diabetes-friendly',
    'heart_disease': 'heart-healthy',
    'arthritis': 'anti-inflammatory',
    'ibs': 'low-fodmap',
    'gerd': 'gerd-friendly',
    'iron_deficiency': 'iron-rich',
    'vitamin_d_deficiency': 'vitamin-d-rich',
    'b12_deficiency': 'b12-rich',
    'calcium_deficiency': 'calcium-rich',
    'zinc_deficiency': 'zinc-rich',
    'high_cholesterol': 'low-cholesterol',
    'high_triglycerides': 'low-triglycerides'
  };
  return map[condition] || null;
};

// Mapping of skill levels to numeric values for comparison
const SKILL_LEVEL_MAP = {
  'beginner': 1,
  'intermediate': 2,
  'advanced': 3
};

// Mapping of budget tiers to numeric values for comparison
const BUDGET_TIER_MAP = {
  'budget': 1,
  'moderate': 2,
  'premium': 3
};

// Helper function to create a weekly cycle of meals
const createWeeklyCycle = (meals, targetCalories) => {
  const weekCycle = [];
  
  // Create 7 days of meals
  for (let day = 0; day < 7; day++) {
    const dayMeals = [];
    let remainingCalories = targetCalories;
    
    // Create 3-5 meals per day depending on calorie target
    const mealCount = targetCalories > 2500 ? 5 : targetCalories > 1800 ? 4 : 3;
    
    for (let i = 0; i < mealCount; i++) {
      // Calculate target calories for this meal
      let mealTargetCalories;
      if (i === 0) { // Breakfast
        mealTargetCalories = Math.round(targetCalories * 0.25);
      } else if (i === mealCount - 1) { // Dinner
        mealTargetCalories = Math.round(remainingCalories * 0.5);
      } else { // Lunch or snacks
        mealTargetCalories = Math.round(remainingCalories * 0.3);
      }
      
      // Get a meal close to the target calories
      const meal = findMealByCalories(meals, mealTargetCalories, remainingCalories);
      
      // Add meal to day
      dayMeals.push(meal);
      
      // Update remaining calories
      remainingCalories -= meal.calories;
    }
    
    weekCycle.push(dayMeals);
  }
  
  return weekCycle;
};

// Helper function to find a meal close to target calories
const findMealByCalories = (meals, targetCalories, maxCalories) => {
  // Sort meals by how close they are to the target calories
  const sortedMeals = [...meals].sort((a, b) => {
    const aDiff = Math.abs(a.calories - targetCalories);
    const bDiff = Math.abs(b.calories - targetCalories);
    return aDiff - bDiff;
  });
  
  // Filter meals that don't exceed maximum calories
  const validMeals = sortedMeals.filter(meal => meal.calories <= maxCalories);
  
  // Return the closest match, or first meal if no valid matches
  return validMeals.length > 0 ? validMeals[0] : sortedMeals[0];
};

module.exports = {
  saveUserPreferences,
  getUserPreferences,
  generateCustomPlan
}; 