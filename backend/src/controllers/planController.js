const asyncHandler = require('express-async-handler');
const { WorkoutPlan, DietPlan, UserPlan, CustomDietPlan, Meal } = require('../models/Plan');

// Add the ingredient category mapping
const INGREDIENT_CATEGORIES = {
  // Produce
  'apple': 'Produce',
  'banana': 'Produce',
  'tomato': 'Produce',
  'tomatoes': 'Produce',
  'onion': 'Produce',
  'onions': 'Produce',
  'carrot': 'Produce',
  'carrots': 'Produce',
  'potato': 'Produce',
  'potatoes': 'Produce',
  'spinach': 'Produce',
  'kale': 'Produce',
  'lettuce': 'Produce',
  'avocado': 'Produce',
  'avocados': 'Produce',
  'bell pepper': 'Produce',
  'bell peppers': 'Produce',
  'cucumber': 'Produce',
  'cucumbers': 'Produce',
  'garlic': 'Produce',
  'ginger': 'Produce',
  'lemon': 'Produce',
  'lemons': 'Produce',
  'lime': 'Produce',
  'limes': 'Produce',
  'mushroom': 'Produce',
  'mushrooms': 'Produce',
  'cilantro': 'Produce',
  'coriander': 'Produce',
  'mint': 'Produce',
  'basil': 'Produce',
  'parsley': 'Produce',
  'peppers': 'Produce',
  
  // Meat & Seafood
  'chicken': 'Meat & Seafood',
  'chicken breast': 'Meat & Seafood',
  'beef': 'Meat & Seafood',
  'steak': 'Meat & Seafood',
  'pork': 'Meat & Seafood',
  'lamb': 'Meat & Seafood',
  'fish': 'Meat & Seafood',
  'salmon': 'Meat & Seafood',
  'tilapia': 'Meat & Seafood',
  'shrimp': 'Meat & Seafood',
  'cod': 'Meat & Seafood',
  'tuna': 'Meat & Seafood',
  'turkey': 'Meat & Seafood',
  'ground beef': 'Meat & Seafood',
  'mince': 'Meat & Seafood',
  'ground turkey': 'Meat & Seafood',
  'sausage': 'Meat & Seafood',
  'bacon': 'Meat & Seafood',
  'keema': 'Meat & Seafood',
  
  // Dairy
  'milk': 'Dairy',
  'cheese': 'Dairy',
  'yogurt': 'Dairy',
  'greek yogurt': 'Dairy',
  'butter': 'Dairy',
  'cream': 'Dairy',
  'cottage cheese': 'Dairy',
  'sour cream': 'Dairy',
  'paneer': 'Dairy',
  'ghee': 'Dairy',
  'raita': 'Dairy',
  'egg': 'Dairy',
  'eggs': 'Dairy',
  
  // Grains & Bakery
  'bread': 'Grains & Bakery',
  'rice': 'Grains & Bakery',
  'pasta': 'Grains & Bakery',
  'flour': 'Grains & Bakery',
  'tortilla': 'Grains & Bakery',
  'tortillas': 'Grains & Bakery',
  'pita': 'Grains & Bakery',
  'naan': 'Grains & Bakery',
  'oats': 'Grains & Bakery',
  'cereal': 'Grains & Bakery',
  'quinoa': 'Grains & Bakery',
  'basmati': 'Grains & Bakery',
  'basmati rice': 'Grains & Bakery',
  
  // Pantry & Spices
  'oil': 'Pantry & Spices',
  'olive oil': 'Pantry & Spices',
  'vegetable oil': 'Pantry & Spices',
  'salt': 'Pantry & Spices',
  'pepper': 'Pantry & Spices',
  'sugar': 'Pantry & Spices',
  'spices': 'Pantry & Spices',
  'cumin': 'Pantry & Spices',
  'cinnamon': 'Pantry & Spices',
  'turmeric': 'Pantry & Spices',
  'paprika': 'Pantry & Spices',
  'chili powder': 'Pantry & Spices',
  'oregano': 'Pantry & Spices',
  'basil': 'Pantry & Spices',
  'thyme': 'Pantry & Spices',
  'rosemary': 'Pantry & Spices',
  'cardamom': 'Pantry & Spices',
  'cloves': 'Pantry & Spices',
  'garam masala': 'Pantry & Spices',
  'curry powder': 'Pantry & Spices',
  'chaat masala': 'Pantry & Spices',
  'biryani masala': 'Pantry & Spices',
  'kadai masala': 'Pantry & Spices',
  'masala': 'Pantry & Spices',
  'vinegar': 'Pantry & Spices',
  'soy sauce': 'Pantry & Spices',
  'mustard': 'Pantry & Spices',
  'honey': 'Pantry & Spices',
  'maple syrup': 'Pantry & Spices',
  'tomato sauce': 'Pantry & Spices',
  'ketchup': 'Pantry & Spices',
  'hot sauce': 'Pantry & Spices',
  'broth': 'Pantry & Spices',
  'stock': 'Pantry & Spices',
  'coconut milk': 'Pantry & Spices',
  'peanut butter': 'Pantry & Spices',
  'jam': 'Pantry & Spices',
  'jelly': 'Pantry & Spices',
  
  // Snacks & Others
  'protein': 'Snacks & Others',
  'whey protein': 'Snacks & Others',
  'protein bar': 'Snacks & Others',
  'nuts': 'Snacks & Others',
  'mixed nuts': 'Snacks & Others',
  'almonds': 'Snacks & Others',
  'walnuts': 'Snacks & Others',
  'cashews': 'Snacks & Others',
  'pistachios': 'Snacks & Others',
  'granola': 'Snacks & Others',
  'chocolate': 'Snacks & Others',
  'chips': 'Snacks & Others',
  'crackers': 'Snacks & Others',
  'ice cream': 'Snacks & Others',
  'juice': 'Snacks & Others',
  'tea': 'Snacks & Others',
  'coffee': 'Snacks & Others',
  'halal whey protein': 'Snacks & Others',
  'pomegranate seeds': 'Produce',
};

// Helper function to parse ingredients and extract quantity, unit, and item name
const parseIngredient = (ingredientString) => {
  // Regex to capture quantity, unit, and ingredient name
  // This handles: "2 cups rice", "1/2 teaspoon salt", "100g chicken", etc.
  const regex = /^([\d\/\.\s]+)?\s*([a-zA-Z]+)?(?:\s+of)?\s*(.*)/i;
  const matches = ingredientString.match(regex);
  
  if (!matches) {
    return {
      original: ingredientString,
      quantity: null,
      unit: null,
      name: ingredientString.trim().toLowerCase()
    };
  }
  
  // Extract components
  let [_, quantity, unit, name] = matches;
  
  // Clean up the name and make it lowercase for comparison
  name = name.trim().toLowerCase();
  
  // Parse quantity (handle fractions)
  if (quantity) {
    quantity = quantity.trim();
    if (quantity.includes('/')) {
      const [numerator, denominator] = quantity.split('/');
      quantity = parseFloat(numerator) / parseFloat(denominator);
    } else {
      quantity = parseFloat(quantity);
    }
  } else {
    quantity = null;
  }
  
  // Clean up unit
  unit = unit ? unit.trim().toLowerCase() : null;
  
  // Check for special cases like weight units
  if (unit === 'g' || unit === 'kg' || unit === 'ml' || unit === 'l') {
    // These are already clean units
  } else if (unit === 'tbsp' || unit === 'tbs' || unit === 'tablespoon' || unit === 'tablespoons') {
    unit = 'tbsp';
  } else if (unit === 'tsp' || unit === 'teaspoon' || unit === 'teaspoons') {
    unit = 'tsp';
  } else if (unit === 'cup' || unit === 'cups') {
    unit = 'cup';
  } else if (unit === 'oz' || unit === 'ounce' || unit === 'ounces') {
    unit = 'oz';
  } else if (unit === 'lb' || unit === 'pound' || unit === 'pounds') {
    unit = 'lb';
  }
  
  return {
    original: ingredientString,
    quantity,
    unit,
    name
  };
};

// Helper function to determine category of an ingredient
const categorizeIngredient = (ingredient) => {
  const name = ingredient.name.toLowerCase();
  
  // Check for exact matches first
  if (INGREDIENT_CATEGORIES[name]) {
    return INGREDIENT_CATEGORIES[name];
  }
  
  // Check for partial matches for ingredients like "chicken breast" or "red bell pepper"
  for (const [key, category] of Object.entries(INGREDIENT_CATEGORIES)) {
    if (name.includes(key)) {
      return category;
    }
  }
  
  // Default category for unknown ingredients
  return 'Other';
};

// Helper function to combine like ingredients
const aggregateIngredients = (parsedIngredients) => {
  const aggregated = {};
  
  for (const ingredient of parsedIngredients) {
    // Create a key that combines name and unit (if it exists)
    const key = ingredient.unit 
      ? `${ingredient.name}_${ingredient.unit}`
      : ingredient.name;
    
    if (!aggregated[key]) {
      // First time seeing this ingredient
      aggregated[key] = {
        ...ingredient,
        category: categorizeIngredient(ingredient)
      };
    } else if (ingredient.quantity) {
      // We've seen this ingredient before, add quantities if they exist
      if (aggregated[key].quantity) {
        aggregated[key].quantity += ingredient.quantity;
      } else {
        aggregated[key].quantity = ingredient.quantity;
      }
    }
  }
  
  return Object.values(aggregated);
};

// Group ingredients by category
const groupByCategory = (ingredients) => {
  const grouped = {};
  
  for (const ingredient of ingredients) {
    if (!grouped[ingredient.category]) {
      grouped[ingredient.category] = [];
    }
    grouped[ingredient.category].push(ingredient);
  }
  
  return grouped;
};

// Format ingredient display for frontend
const formatIngredientForDisplay = (ingredient) => {
  if (!ingredient.quantity && !ingredient.unit) {
    return ingredient.original; // Return original if can't parse
  }
  
  let displayQuantity = '';
  let displayUnit = ingredient.unit || '';
  
  if (ingredient.quantity) {
    // Convert large measurements to appropriate units
    if ((displayUnit === 'g' || displayUnit === 'gram' || displayUnit === 'grams') && ingredient.quantity >= 1000) {
      // Convert grams to kilograms
      displayQuantity = (ingredient.quantity / 1000).toFixed(2).replace(/\.00$/, '');
      displayUnit = 'kg';
    } else if ((displayUnit === 'ml' || displayUnit === 'milliliter' || displayUnit === 'milliliters') && ingredient.quantity >= 1000) {
      // Convert milliliters to liters
      displayQuantity = (ingredient.quantity / 1000).toFixed(2).replace(/\.00$/, '');
      displayUnit = 'L';
    } else {
      // Format nice fractions for common values
      if (ingredient.quantity === 0.25) displayQuantity = '¼';
      else if (ingredient.quantity === 0.5) displayQuantity = '½';
      else if (ingredient.quantity === 0.75) displayQuantity = '¾';
      else if (ingredient.quantity === 0.33) displayQuantity = '⅓';
      else if (ingredient.quantity === 0.67) displayQuantity = '⅔';
      else displayQuantity = ingredient.quantity.toString();
      
      // For whole numbers, remove decimal point
      if (displayQuantity.includes('.') && displayQuantity.endsWith('.0')) {
        displayQuantity = displayQuantity.replace('.0', '');
      }
    }
  }
  
  return {
    ...ingredient,
    displayQuantity,
    displayUnit,
    displayText: `${displayQuantity} ${displayUnit} ${ingredient.name}`.trim()
  };
};

// Helper function to sanitize and recalculate meal nutrition totals
const sanitizeMealNutrition = (meal) => {
  if (!meal) {
    console.error('Cannot sanitize meal nutrition: Meal is null or undefined');
    return null;
  }

  // Helper function to ensure valid number
  const ensureValidNumber = (value, defaultValue = 0) => {
    if (value === undefined || value === null) return defaultValue;
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num) ? num : defaultValue;
  };
  
  // Check if meal has structured ingredients to use for calculation
  if (meal.structuredIngredients && Array.isArray(meal.structuredIngredients) && meal.structuredIngredients.length > 0) {
    // Start with zeroed nutrition values
    const nutritionTotals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };
    
    // Remove any invalid ingredients
    const validIngredients = meal.structuredIngredients.filter(ingredient => 
      ingredient && typeof ingredient === 'object' && ingredient.name
    );
    
    if (validIngredients.length < meal.structuredIngredients.length) {
      console.warn(`Removed ${meal.structuredIngredients.length - validIngredients.length} invalid ingredients from meal ${meal.name || meal._id}`);
      meal.structuredIngredients = validIngredients;
    }
    
    // Sum up the nutrition from all ingredients with proper validation
    meal.structuredIngredients.forEach((ingredient, index) => {
      // Ensure each ingredient has valid nutrition values
      const calories = ensureValidNumber(ingredient.calories);
      const protein = ensureValidNumber(ingredient.protein);
      const carbs = ensureValidNumber(ingredient.carbs);
      const fats = ensureValidNumber(ingredient.fats);
      
      // Log if we found invalid values we had to fix
      if (calories !== ingredient.calories || protein !== ingredient.protein || 
          carbs !== ingredient.carbs || fats !== ingredient.fats) {
        console.warn(`Ingredient ${index} (${ingredient.name}) in meal ${meal.name || meal._id} had invalid nutrition values that were corrected`);
        
        // Fix the ingredient values in place to ensure consistency
        ingredient.calories = calories;
        ingredient.protein = protein;
        ingredient.carbs = carbs;
        ingredient.fats = fats;
      }
      
      // Add to totals
      nutritionTotals.calories += calories;
      nutritionTotals.protein += protein;
      nutritionTotals.carbs += carbs;
      nutritionTotals.fats += fats;
    });
    
    // Sanity check for the total meal
    const MAX_MEAL_CALORIES = 3000;
    const MAX_MEAL_PROTEIN = 250;
    const MAX_MEAL_CARBS = 300;
    const MAX_MEAL_FATS = 150;
    
    // Apply final meal-level caps
    if (nutritionTotals.calories > MAX_MEAL_CALORIES) {
      console.log(`WARNING: Total calories (${nutritionTotals.calories}) exceeds maximum allowed (${MAX_MEAL_CALORIES})`);
      nutritionTotals.calories = MAX_MEAL_CALORIES;
    }
    
    if (nutritionTotals.protein > MAX_MEAL_PROTEIN) {
      console.log(`WARNING: Total protein (${nutritionTotals.protein}) exceeds maximum allowed (${MAX_MEAL_PROTEIN})`);
      nutritionTotals.protein = MAX_MEAL_PROTEIN;
    }
    
    if (nutritionTotals.carbs > MAX_MEAL_CARBS) {
      console.log(`WARNING: Total carbs (${nutritionTotals.carbs}) exceeds maximum allowed (${MAX_MEAL_CARBS})`);
      nutritionTotals.carbs = MAX_MEAL_CARBS;
    }
    
    if (nutritionTotals.fats > MAX_MEAL_FATS) {
      console.log(`WARNING: Total fats (${nutritionTotals.fats}) exceeds maximum allowed (${MAX_MEAL_FATS})`);
      nutritionTotals.fats = MAX_MEAL_FATS;
    }
    
    // Update meal's nutrition fields with the capped values
    meal.calories = parseFloat(nutritionTotals.calories.toFixed(1));
    meal.protein = parseFloat(nutritionTotals.protein.toFixed(1));
    meal.carbs = parseFloat(nutritionTotals.carbs.toFixed(1));
    meal.fats = parseFloat(nutritionTotals.fats.toFixed(1));
    
    console.log(`Sanitized meal nutrition for ${meal.name || meal._id}: cal=${meal.calories}, p=${meal.protein}, c=${meal.carbs}, f=${meal.fats}`);
  } else {
    console.log(`No structured ingredients found for meal ${meal.name || meal._id}, using existing nutrition values`);
    
    // No structured ingredients, ensure the existing values are valid
    meal.calories = ensureValidNumber(meal.calories, 100);
    meal.protein = ensureValidNumber(meal.protein, 5);
    meal.carbs = ensureValidNumber(meal.carbs, 10);
    meal.fats = ensureValidNumber(meal.fats, 2);
    
    console.log(`Validated existing meal nutrition for ${meal.name || meal._id}: cal=${meal.calories}, p=${meal.protein}, c=${meal.carbs}, f=${meal.fats}`);
  }
  
  // Final safety - ensure all nutrition values are present and rounded to 1 decimal place
  meal.calories = parseFloat((meal.calories || 0).toFixed(1));
  meal.protein = parseFloat((meal.protein || 0).toFixed(1));
  meal.carbs = parseFloat((meal.carbs || 0).toFixed(1));
  meal.fats = parseFloat((meal.fats || 0).toFixed(1));
  
  return meal;
};

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
      // If diet plan is changing, clear out the custom diet plan
      if (dietPlanId !== undefined && dietPlanId !== userPlan.dietPlanId) {
        console.log(`User ${userId} selecting new diet plan. Clearing custom plan.`);
        userPlan.customDietPlanId = undefined;
      }
      
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
    
    // Ensure plan consistency - verify the custom plan exists if referenced
    if (userPlan.customDietPlanId) {
      const customPlanExists = await CustomDietPlan.findById(userPlan.customDietPlanId);
      if (!customPlanExists) {
        console.warn(`Custom plan ${userPlan.customDietPlanId} referenced but not found. Removing reference.`);
        userPlan.customDietPlanId = undefined;
        await userPlan.save();
      }
    }

    console.log('Looking for plans with IDs:', {
      workout: userPlan.workoutPlanId,
      diet: userPlan.dietPlanId,
      customDiet: userPlan.customDietPlanId || 'None'
    });

    // Try fetching ALL plans to see what we have
    const allWorkoutPlans = await WorkoutPlan.find({});
    const allDietPlans = await DietPlan.find({});
    
    console.log('Available plans:', {
      workouts: allWorkoutPlans.map(w => w.id),
      diets: allDietPlans.map(d => d.id)
    });

    // Load the workout plan
    const workoutPlan = await WorkoutPlan.findOne({ id: userPlan.workoutPlanId });
    
    // IMPORTANT FIX: Check for custom diet plan first, and use it if it exists
    let dietPlan;
    if (userPlan.customDietPlanId) {
      // Use the custom diet plan if available
      dietPlan = await CustomDietPlan.findById(userPlan.customDietPlanId);
      console.log('Using custom diet plan:', {
        customPlanExists: !!dietPlan,
        customPlanId: userPlan.customDietPlanId
      });
    }
    
    // Fall back to the original diet plan if no custom plan exists or if it wasn't found
    if (!dietPlan) {
      dietPlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
      console.log('Using base diet plan:', userPlan.dietPlanId);
    }

    console.log('Found plans:', {
      workoutPlan: !!workoutPlan,
      dietPlan: !!dietPlan,
      isCustomPlan: !!userPlan.customDietPlanId && !!dietPlan
    });

    // Set both dates to midnight for proper calendar day comparison
    const startDate = new Date(userPlan.startDate);
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate days based on calendar days
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(daysSinceStart / 7) % 6;
    const dayNumber = daysSinceStart % 14; // Always use modulo 14 for 2-week meal cycles
    
    console.log('Day calculation in getTodaysPlan:', {
      daysSinceStart,
      dayNumber,
      today: today.toISOString(),
      startDate: startDate.toISOString()
    });

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

    const todaysMeals = dietPlan?.weekCycle[dayNumber];
    
    // Log the first meal to aid debugging
    console.log('Today\'s meals from diet plan:', {
      mealsFound: !!todaysMeals,
      mealCount: todaysMeals?.length || 0,
      firstMealName: todaysMeals && todaysMeals.length > 0 ? todaysMeals[0].name : 'No meals',
      isUsingCustomPlan: !!userPlan.customDietPlanId && !!dietPlan,
      dayNumber
    });

    // Check for customized versions of meals and replace the template meals
    let finalMeals = [];
    if (todaysMeals && todaysMeals.length > 0) {
      // Find all customized meals for this user
      const customizedMeals = await Meal.find({ 
        userId: userId,
        isCustomized: true 
      });
      
      console.log(`Found ${customizedMeals.length} customized meals for today's plan`);
      
      // Function to replace template meals with customized versions if available
      const replaceWithCustomizedMeals = async (templateMeals) => {
        const result = [];
        
        for (const templateMeal of templateMeals) {
          // Check if we have a customized version of this meal
          const customized = customizedMeals.find(
            m => m.originalMealId && m.originalMealId.toString() === templateMeal._id.toString()
          );
          
          if (customized) {
            console.log(`Using customized version of meal: ${templateMeal.name}`);
            
            // Include all fields from the customized meal
            const mealWithDetails = {
              ...customized.toObject(),
              // Preserve these fields from the template meal if not in customized version
              timing: customized.timing || templateMeal.timing,
              category: customized.category || templateMeal.category,
              dayNumber: templateMeal.dayNumber,
              originalMealId: templateMeal._id,
              // Ensure structured ingredients are included if available
              structuredIngredients: customized.structuredIngredients || []
            };
            
            result.push(mealWithDetails);
          } else {
            // Use the template meal as is, ensuring structured ingredients are included if available
            const templateWithDetails = {
              ...templateMeal.toObject(),
              // Make sure structured ingredients are included
              structuredIngredients: templateMeal.structuredIngredients || []
            };
            
            result.push(templateWithDetails);
          }
        }
        
        return result;
      };
      
      // Replace meals with customized versions
      finalMeals = await replaceWithCustomizedMeals(todaysMeals);
    } else {
      finalMeals = [];
    }

    const todaysPlan = {
      date: today,
      workout: todaysWorkout,
      meals: finalMeals, // Use the meals with customized versions where available
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

    // Load the workout plan
    const workoutPlan = await WorkoutPlan.findOne({ id: userPlan.workoutPlanId });
    
    // IMPORTANT FIX: Check for custom diet plan first, and use it if it exists
    let dietPlan;
    if (userPlan.customDietPlanId) {
      // Use the custom diet plan if available
      dietPlan = await CustomDietPlan.findById(userPlan.customDietPlanId);
      console.log('Using custom diet plan for week view:', {
        customPlanExists: !!dietPlan,
        customPlanId: userPlan.customDietPlanId
      });
    }
    
    // Fall back to the original diet plan if no custom plan exists or if it wasn't found
    if (!dietPlan) {
      dietPlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
      console.log('Using base diet plan for week view:', userPlan.dietPlanId);
    }
    
    console.log('Found plans for week:', {
      workoutPlan: !!workoutPlan,
      dietPlan: !!dietPlan,
      isCustomPlan: !!userPlan.customDietPlanId && !!dietPlan
    });

    // Set both dates to midnight for proper calendar day comparison
    const startDate = new Date(userPlan.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    // Initialize today's date once for use throughout the function
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all customized meals for this user
    const customizedMeals = await Meal.find({ 
      userId: userId,
      isCustomized: true 
    });
    
    console.log(`Found ${customizedMeals.length} customized meals for week plan`);

    // Function to replace template meals with customized versions if available
    const replaceWithCustomizedMeals = async (templateMeals) => {
      const result = [];
      
      for (const templateMeal of templateMeals) {
        // Check if we have a customized version of this meal
        const customized = customizedMeals.find(
          m => m.originalMealId && m.originalMealId.toString() === templateMeal._id.toString()
        );
        
        if (customized) {
          // Include all fields from the customized meal
          const mealWithDetails = {
            ...customized.toObject(),
            // Preserve these fields from the template meal if not in customized version
            timing: customized.timing || templateMeal.timing,
            category: customized.category || templateMeal.category,
            dayNumber: templateMeal.dayNumber,
            originalMealId: templateMeal._id,
            // Ensure structured ingredients are included if available
            structuredIngredients: customized.structuredIngredients || []
          };
          
          result.push(mealWithDetails);
        } else {
          // Use the template meal as is, ensuring structured ingredients are included if available
          const templateWithDetails = {
            ...templateMeal.toObject(),
            // Make sure structured ingredients are included
            structuredIngredients: templateMeal.structuredIngredients || []
          };
          
          result.push(templateWithDetails);
        }
      }
      
      return result;
    };

    // Calculate days based on calendar days
    const weekDays = [];
    
    // Start with today and show the next 7 days
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      // Set to midnight for day calculations
      currentDate.setHours(0, 0, 0, 0);
      
      // Calculate days since start
      const daysSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.floor(daysSinceStart / 7) % 6;
      const dayNumber = daysSinceStart % 14; // Always use modulo 14 for 2-week meal cycles

      let dayWorkout = null;
      
      // Find workout for this day if it exists
      if (workoutPlan && workoutPlan.weeks && workoutPlan.weeks[weekNumber]) {
        for (const workout of workoutPlan.weeks[weekNumber]) {
          if (workout.dayNumber === (dayNumber % 7) + 1) {
            dayWorkout = workout;
            break;
          }
        }
      }
      
      // Get meals for this day
      let dayMeals = dietPlan?.weekCycle[dayNumber] || [];
      
      // Replace with customized versions if available
      dayMeals = await replaceWithCustomizedMeals(dayMeals);
      
      // Add to the week array
      weekDays.push({
        date: currentDate,
        workout: dayWorkout,
        meals: dayMeals,
        progress: {
          completedWorkouts: userPlan.progress.completedWorkouts.filter(
            date => date.toDateString() === currentDate.toDateString()
          ),
          completedMeals: userPlan.progress.completedMeals.filter(
            meal => meal.date.toDateString() === currentDate.toDateString()
          )
        }
      });
    }

    res.status(200).json(weekDays);
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
    
    // If user changes diet plan, clear out the custom diet plan as it's no longer valid
    if (dietPlanId !== undefined && dietPlanId !== userPlan.dietPlanId) {
      console.log(`User ${userId} changing diet plan from ${userPlan.dietPlanId} to ${dietPlanId}. Clearing custom plan.`);
      userPlan.customDietPlanId = undefined;
    }
  
    if (workoutPlanId !== undefined) userPlan.workoutPlanId = workoutPlanId;
    if (dietPlanId !== undefined) userPlan.dietPlanId = dietPlanId;
    userPlan.startDate = new Date();
    userPlan.progress = {
      completedWorkouts: [],
      completedMeals: []
    };
  
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
  }),

  getShoppingList: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      res.status(400);
      throw new Error('Start date and end date are required');
    }
    
    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400);
      throw new Error('Invalid date format');
    }
    
    // Get the user's diet plan
    const userPlan = await UserPlan.findOne({ userId });
    if (!userPlan || !userPlan.dietPlanId) {
      res.status(404);
      throw new Error('No diet plan found');
    }
    
    const dietPlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
    if (!dietPlan) {
      res.status(404);
      throw new Error('Diet plan not found');
    }
    
    // Collect ingredients from all meals in the date range
    let allIngredients = [];
    const startDateObj = new Date(start);
    startDateObj.setHours(0, 0, 0, 0);
    const endDateObj = new Date(end);
    endDateObj.setHours(23, 59, 59, 999);
    
    // Calculate days difference
    const daysDiff = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    
    // Set start date to midnight for proper calendar day comparison
    const planStartDate = new Date(userPlan.startDate);
    planStartDate.setHours(0, 0, 0, 0);
    
    // Calculate day offset for each day in the range
    for (let i = 0; i < daysDiff; i++) {
      const currentDate = new Date(startDateObj);
      currentDate.setDate(startDateObj.getDate() + i);
      
      // Calculate days since plan start
      const daysSinceStart = Math.floor((currentDate - planStartDate) / (1000 * 60 * 60 * 24));
      const dayNumber = daysSinceStart % 14; // 14-day cycle
      
      // Get all meals for this day
      const meals = dietPlan.weekCycle[dayNumber] || [];
      
      // Extract ingredients from all meals
      for (const meal of meals) {
        // Check for customized meal version first
        const customizedMeal = await Meal.findOne({ 
          originalMealId: meal._id, 
          userId: userId,
          isCustomized: true
        });
        
        if (customizedMeal) {
          // Use structuredIngredients if available
          if (customizedMeal.structuredIngredients && customizedMeal.structuredIngredients.length > 0) {
            // Convert structured ingredients to string format for shopping list
            const formattedIngredients = customizedMeal.structuredIngredients.map(si => 
              `${si.quantity}${si.unit} ${si.name}`
            );
            allIngredients = [...allIngredients, ...formattedIngredients];
          } else {
            // Fallback to string ingredients
            allIngredients = [...allIngredients, ...customizedMeal.ingredients];
          }
        } else {
          // Use original meal ingredients
          // Also check for structuredIngredients on the original meal
          if (meal.structuredIngredients && meal.structuredIngredients.length > 0) {
            // Convert structured ingredients to string format for shopping list
            const formattedIngredients = meal.structuredIngredients.map(si => 
              `${si.quantity}${si.unit} ${si.name}`
            );
            allIngredients = [...allIngredients, ...formattedIngredients];
          } else {
            // Fallback to string ingredients
        allIngredients = [...allIngredients, ...meal.ingredients];
          }
        }
      }
    }
    
    // Parse ingredients
    const parsedIngredients = allIngredients.map(parseIngredient);
    
    // Aggregate like ingredients
    const aggregatedIngredients = aggregateIngredients(parsedIngredients);
    
    // Group by category
    const groupedIngredients = groupByCategory(aggregatedIngredients);
    
    // Format for display
    const formattedList = {};
    for (const [category, ingredients] of Object.entries(groupedIngredients)) {
      formattedList[category] = ingredients.map(formatIngredientForDisplay);
    }
    
    res.status(200).json({ 
      startDate: startDateObj, 
      endDate: endDateObj,
      shoppingList: formattedList
    });
  }),

  findAlternativeMeals: asyncHandler(async (req, res) => {
    const { date, mealNumber } = req.query;
    const userId = req.user._id;
    
    try {
      // Get user's current meal plan
    const userPlan = await UserPlan.findOne({ userId });
    if (!userPlan) {
      res.status(404);
      throw new Error('No plan found');
    }
    
      // Get the user's diet plan
    let dietPlan;
    if (userPlan.customDietPlanId) {
      dietPlan = await CustomDietPlan.findById(userPlan.customDietPlanId);
      } else if (userPlan.dietPlanId) {
        dietPlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
    }
    
    if (!dietPlan) {
      res.status(404);
        throw new Error('No diet plan found');
    }
    
      // Calculate day number based on date
    const currentDate = new Date(date);
    const startDate = new Date(userPlan.startDate);
    startDate.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(currentDate - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Calculate day in week cycle
      const dayInCycle = diffDays % dietPlan.weekCycle.length;
      
      // Get the original meal
      let originalMeal;
      if (dietPlan.weekCycle && dietPlan.weekCycle[dayInCycle]) {
        const dayMeals = dietPlan.weekCycle[dayInCycle];
        if (dayMeals && dayMeals[mealNumber - 1]) {
          originalMeal = dayMeals[mealNumber - 1];
        }
      }
      
      if (!originalMeal) {
      res.status(404);
        throw new Error('Original meal not found');
      }
      
      // Determine meal timing by position and explicit timing data
      const getMealTimingType = (meal, mealPosition) => {
        // 1. Use explicit timing property if available
        if (meal.timing) {
          return meal.timing.toLowerCase();
        }
        
        // 2. Determine by name
        const mealName = meal.name ? meal.name.toLowerCase() : '';
        if (mealName.includes('breakfast') || mealName.includes('pancake') || 
            mealName.includes('oatmeal') || mealName.includes('egg') || 
            mealName.includes('cereal')) {
          return 'breakfast';
        }
        
        if (mealName.includes('lunch') || mealName.includes('sandwich') || 
            mealName.includes('salad') || mealName.includes('wrap')) {
          return 'lunch';
        }
        
        if (mealName.includes('dinner') || mealName.includes('curry') || 
            mealName.includes('steak') || mealName.includes('roast')) {
          return 'dinner';
        }
        
        // 3. Use meal position as a fallback
        if (mealPosition === 0) return 'breakfast';
        if (mealPosition === 1) return 'lunch';
        if (mealPosition === 2) return 'dinner';
        return 'snack';
      };
      
      // Set original meal timing if not present
      const mealPosition = mealNumber - 1;
      const originalMealType = originalMeal.timing || getMealTimingType(originalMeal, mealPosition);
      originalMeal.timing = originalMealType; // Ensure it's set for comparison
      
      console.log('Original meal details:', {
        name: originalMeal.name,
        type: originalMealType,
        category: originalMeal.category || 'home-cooked'
      });
      
      // Find all possible alternatives
      let allMeals = await Meal.find({});
      
      console.log(`Found ${allMeals.length} total meals in database`);
      
      // Filter out the original meal and ones without nutrient data
      const validMeals = allMeals.filter(meal => {
        // Skip meals with insufficient data
        if (!meal.calories && !meal.protein) return false;
        
        // Skip the original meal
        if (originalMeal._id && meal._id && meal._id.toString() === originalMeal._id.toString()) {
          return false;
        }
        
        return true;
      });
      
      // Calculate nutritional similarity score (lower is more similar)
      const calculateNutritionalSimilarity = (meal1, meal2) => {
        // Base calculations on macros that exist in both meals to avoid NaN
        let score = 0;
        
        // Compare calories (weighted higher)
        if (meal1.calories && meal2.calories) {
          score += Math.abs((meal1.calories - meal2.calories) / Math.max(meal1.calories, 1)) * 2;
        }
        
        // Compare macronutrients
        if (meal1.protein && meal2.protein) {
          score += Math.abs((meal1.protein - meal2.protein) / Math.max(meal1.protein, 1));
        }
        
        if (meal1.carbs && meal2.carbs) {
          score += Math.abs((meal1.carbs - meal2.carbs) / Math.max(meal1.carbs, 1));
        }
        
        if (meal1.fats && meal2.fats) {
          score += Math.abs((meal1.fats - meal2.fats) / Math.max(meal1.fats, 1));
        }
        
        return score;
      };
      
      // IMPROVED MEAL CATEGORIZATION: First categorize by meal timing and category
      // Create 4 groups: same-timing-home, same-timing-restaurant, different-timing-home, different-timing-restaurant
      const sameTiming = {
        homeMade: [],
        restaurant: []
      };
      
      const differentTiming = {
        homeMade: [],
        restaurant: []
      };
      
      // Categorize each meal
      validMeals.forEach(meal => {
        // Determine meal timing
        const mealTiming = meal.timing || getMealTimingType(meal, -1);
        
        // Determine if restaurant or homemade
        const isRestaurant = meal.category === 'restaurant' || 
                            meal.category === 'takeout' || 
                            meal.category === 'fast-food';
        
        // Sort into appropriate category
        if (mealTiming === originalMealType) {
          if (isRestaurant) {
            sameTiming.restaurant.push(meal);
          } else {
            sameTiming.homeMade.push(meal);
          }
      } else {
          if (isRestaurant) {
            differentTiming.restaurant.push(meal);
          } else {
            differentTiming.homeMade.push(meal);
          }
        }
      });
      
      console.log('Meal counts by type and category:', {
        homeCookedSame: sameTiming.homeMade.length,
        restaurantSame: sameTiming.restaurant.length,
        homeCookedDifferent: differentTiming.homeMade.length,
        restaurantDifferent: differentTiming.restaurant.length
      });
      
      // Sort each category by nutritional similarity
      const sortByNutritionalSimilarity = (meals) => {
        return [...meals].sort((a, b) => {
          return calculateNutritionalSimilarity(originalMeal, a) - calculateNutritionalSimilarity(originalMeal, b);
        });
      };
      
      const sortedSameTimingHome = sortByNutritionalSimilarity(sameTiming.homeMade);
      const sortedSameTimingRestaurant = sortByNutritionalSimilarity(sameTiming.restaurant);
      const sortedDifferentTimingHome = sortByNutritionalSimilarity(differentTiming.homeMade);
      const sortedDifferentTimingRestaurant = sortByNutritionalSimilarity(differentTiming.restaurant);
      
      // Target numbers for better diversity
      const TARGET_HOME_COOKED = 20;
      const TARGET_RESTAURANT = 10;
      
      // Build final list of alternatives with priority for same timing
      let homeCookedMeals = [];
      let restaurantMeals = [];
      
      // 1. First, try to fill with same meal timing
      homeCookedMeals = sortedSameTimingHome.slice(0, TARGET_HOME_COOKED);
      restaurantMeals = sortedSameTimingRestaurant.slice(0, TARGET_RESTAURANT);
      
      // 2. If not enough same meal timing, fill with different meal timing
      if (homeCookedMeals.length < TARGET_HOME_COOKED) {
        homeCookedMeals = [
          ...homeCookedMeals,
          ...sortedDifferentTimingHome.slice(0, TARGET_HOME_COOKED - homeCookedMeals.length)
        ];
      }
      
      if (restaurantMeals.length < TARGET_RESTAURANT) {
        restaurantMeals = [
          ...restaurantMeals,
          ...sortedDifferentTimingRestaurant.slice(0, TARGET_RESTAURANT - restaurantMeals.length)
        ];
      }
      
      // 3. Combine all alternatives
      let alternativeMeals = [...homeCookedMeals, ...restaurantMeals];
      
      // Log the final distribution
      const categoryCount = {};
      alternativeMeals.forEach(meal => {
        const category = meal.category || 'home-cooked';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
      
      console.log('Final category distribution:', categoryCount);
      console.log('Total alternatives:', alternativeMeals.length);
    
    // Return the results
    res.status(200).json({
      originalMeal,
        alternativeMeals
      });
    } catch (error) {
      console.error('Error finding alternative meals:', error);
      res.status(500).json({
        message: 'Error finding alternative meals',
        error: error.message
      });
    }
  }),

  swapMeal: asyncHandler(async (req, res) => {
    const { newMealId, date, mealNumber } = req.body;
    const userId = req.user._id;
    
    if (!newMealId) {
      res.status(400);
      throw new Error('New meal ID is required');
    }
    
    if (!date) {
      res.status(400);
      throw new Error('Date is required');
    }
    
    if (!mealNumber) {
      res.status(400);
      throw new Error('Meal number is required');
    }
    
    // Get user's plan
    const userPlan = await UserPlan.findOne({ userId });
    
    if (!userPlan) {
      res.status(404);
      throw new Error('No plan found');
    }
    
    // Get the new meal to swap in
    const newMeal = await Meal.findById(newMealId);
    if (!newMeal) {
      res.status(404);
      throw new Error('New meal not found');
    }
    
    console.log('Found new meal:', {
      id: newMeal._id,
      name: newMeal.name,
      hasCalories: !!newMeal.calories,
      hasProtein: !!newMeal.protein,
      hasCarbs: !!newMeal.carbs,
      hasFats: !!newMeal.fats
    });
    
    // Calculate day number based on date
    const currentDate = new Date(date);
    const startDate = new Date(userPlan.startDate);
    startDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    const daysSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const dayNumber = daysSinceStart % 14;
    
    console.log('Day calculation:', { daysSinceStart, dayNumber });
    console.log('BACKEND - DATE DEBUG:', {
      receivedDate: date,
      parsedCurrentDate: currentDate.toISOString(),
      startDate: startDate.toISOString(),
      daysSinceStart,
      dayNumber,
      todayRaw: new Date(),
      todayCalculated: Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24)) % 14
    });
    
    // Check if the user already has a custom plan, if not create one
    let customPlan;
    
    if (userPlan.customDietPlanId) {
      customPlan = await CustomDietPlan.findById(userPlan.customDietPlanId);
    }
    
    if (!customPlan) {
      // Get the base diet plan
      const basePlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
      if (!basePlan) {
        res.status(404);
        throw new Error('Base diet plan not found');
      }
      
      console.log('Creating new custom plan based on:', basePlan.id);
      
      // Create a new custom plan based on the original
      customPlan = new CustomDietPlan({
        userId,
        basePlanId: userPlan.dietPlanId,
        weekCycle: JSON.parse(JSON.stringify(basePlan.weekCycle)) // Deep copy
      });
      
      // Save the new custom plan
      await customPlan.save();
      
      // Update the user's plan to reference the custom plan
      userPlan.customDietPlanId = customPlan._id;
      await userPlan.save();
      
      console.log('Created and linked new custom plan:', customPlan._id);
    }
    
    // Check if the day and meal exist in the custom plan
    if (!customPlan.weekCycle[dayNumber] || 
        !customPlan.weekCycle[dayNumber][mealNumber - 1]) {
      console.log('Plan structure:', {
        hasDayNumber: !!customPlan.weekCycle[dayNumber],
        hasMealNumber: customPlan.weekCycle[dayNumber] ? 
          !!customPlan.weekCycle[dayNumber][mealNumber - 1] : false,
        weekCycleLength: customPlan.weekCycle.length
      });
      res.status(404);
      throw new Error('Unable to find the meal to swap');
    }
    
    // Store the original meal for comparison
    const originalMeal = customPlan.weekCycle[dayNumber][mealNumber - 1];
    console.log('BACKEND - BEFORE SWAP, ORIGINAL MEAL:', JSON.stringify(originalMeal));
    
    // Make sure all required fields have values
    const mealToSave = {
      name: newMeal.name || 'Unnamed Meal',
      calories: newMeal.calories || 0,
      protein: newMeal.protein || 0,
      carbs: newMeal.carbs || 0,
      fats: newMeal.fats || 0,
      ingredients: newMeal.ingredients || [],
      instructions: newMeal.instructions || []
    };
    
    // Add optional fields if they exist
    if (newMeal.timing) mealToSave.timing = newMeal.timing;
    if (newMeal.micronutrients) mealToSave.micronutrients = newMeal.micronutrients;
    if (newMeal.notes) mealToSave.notes = newMeal.notes;
    if (newMeal.category) mealToSave.category = newMeal.category;
    
    console.log('About to save meal with fields:', Object.keys(mealToSave));
    
    // Swap the meal
    customPlan.weekCycle[dayNumber][mealNumber - 1] = mealToSave;
    
    console.log('BACKEND - MEAL REPLACED IN CUSTOM PLAN:', {
      dayNumber,
      mealNumber,
      newMealName: mealToSave.name,
      // Log the current day's meals after update
      allMealsInDay: customPlan.weekCycle[dayNumber].map(m => m.name || 'unnamed')
    });
    
    try {
      // Save the updated custom plan
      await customPlan.save();
      
      // Verify the save was successful by refetching the plan
      const verifiedPlan = await CustomDietPlan.findById(customPlan._id);
      const verifiedMeal = verifiedPlan.weekCycle[dayNumber][mealNumber - 1];
      
      // Confirm that the new meal is actually in the plan
      if (verifiedMeal.name !== mealToSave.name) {
        console.error('Verification failed - saved meal name does not match:', {
          expected: mealToSave.name,
          actual: verifiedMeal.name
        });
        res.status(500);
        throw new Error('Meal swap verification failed');
      }
      
      console.log('Successfully verified meal swap:', {
        userId,
        customPlanId: customPlan._id,
        dayNumber,
        mealNumber,
        oldMeal: originalMeal.name,
        newMeal: verifiedMeal.name
      });
      
      // Get today's full plan for response
      const userProgress = userPlan.progress || { completedWorkouts: [], completedMeals: [] };
      
      // Calculate which day of the plan today is
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const todayDayNumber = diffDays % 14;
      
      console.log('BACKEND - VERIFICATION CHECK:', {
        todayDayNumber,
        swapDayNumber: dayNumber,
        areDaysSame: todayDayNumber === dayNumber,
        mealNumberBeingSwapped: mealNumber
      });
      
      // Get complete plan data by assembling from Custom Plan and Workout Plan
      let workoutPlan = null;
      if (userPlan.workoutPlanId) {
        workoutPlan = await WorkoutPlan.findOne({ id: userPlan.workoutPlanId });
      }
      
      // Get today's workout if available
      let todaysWorkout = null;
      if (workoutPlan && workoutPlan.weeks && workoutPlan.weeks[0]) {
        // Find workout for today based on plan frequency and day offset
        const frequency = workoutPlan.frequency;
        let workoutDayIndex = -1;
        
        // Map day number to workout day based on frequency
        if (frequency === '3day') {
          // 3-day plans typically are M/W/F (days 1, 3, 5)
          const dayMap = { 0: 0, 2: 1, 4: 2 }; // Map day in week to workout index
          workoutDayIndex = dayMap[todayDayNumber % 7];
        } else if (frequency === '4day') {
          // 4-day plans typically are M/T/Th/F (days 1, 2, 4, 5)
          const dayMap = { 0: 0, 1: 1, 3: 2, 4: 3 }; // Map day in week to workout index
          workoutDayIndex = dayMap[todayDayNumber % 7];
        } else if (frequency === '2day') {
          // 2-day plans typically are T/Th (days 2, 4)
          const dayMap = { 1: 0, 3: 1 }; // Map day in week to workout index
          workoutDayIndex = dayMap[todayDayNumber % 7];
        }
        
        // If today is a workout day, get the workout
        if (workoutDayIndex !== undefined && workoutDayIndex !== -1) {
          const weekNumber = Math.floor(diffDays / 7) % workoutPlan.weeks.length;
          todaysWorkout = workoutPlan.weeks[weekNumber][workoutDayIndex];
        }
      }
      
      // Assemble today's meals from the custom plan
      let todaysMeals = [];
      if (verifiedPlan.weekCycle && verifiedPlan.weekCycle[todayDayNumber]) {
        todaysMeals = verifiedPlan.weekCycle[todayDayNumber];
      }
      
      console.log('BACKEND - TODAY PLAN STRUCTURE BEING SENT:', JSON.stringify({
        mealsLength: todaysMeals.length,
        mealsIsArray: Array.isArray(todaysMeals),
        firstItemType: typeof todaysMeals[0],
        firstItemIsArray: Array.isArray(todaysMeals[0]),
        allMealNames: todaysMeals.map(meal => meal.name || 'unnamed meal')
      }));
      
      // Create the final day plan
      const todaysPlan = {
        date: today,
        workout: todaysWorkout,
        meals: todaysMeals,
        progress: userProgress
      };
      
      // Send the response with both the swap info and today's plan
      res.status(200).json({
        message: 'Meal swapped successfully',
        swappedMeal: newMeal,
        mealDetails: {
          dayNumber,
          mealNumber,
          originalName: originalMeal.name,
          newName: verifiedMeal.name
        },
        todaysPlan // Include today's complete plan in the response
      });
    } catch (error) {
      console.error('Error saving custom plan:', error);
      res.status(500);
      throw error;
    }
  }),

  // Helper function to recalculate meal nutrition based on structured ingredients
  recalculateMealNutrition: asyncHandler(async (req, res) => {
    const { id: mealId } = req.params;
    const { structuredIngredients, updateStrings = true } = req.body;
    
    if (!structuredIngredients || !Array.isArray(structuredIngredients)) {
      res.status(400);
      throw new Error('Structured ingredients are required and must be an array');
    }
    
    // Find the meal to update
    const meal = await Meal.findById(mealId);
    
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found');
    }
    
    // Update the structured ingredients
    meal.structuredIngredients = structuredIngredients;
    
    // Recalculate nutrition totals
    const nutritionTotals = recalculateMealNutrition(structuredIngredients);
    meal.calories = nutritionTotals.calories;
    meal.protein = nutritionTotals.protein;
    meal.carbs = nutritionTotals.carbs;
    meal.fats = nutritionTotals.fats;
    
    // Optionally update string ingredients for backward compatibility
    if (updateStrings) {
      meal.ingredients = structuredIngredients.map(ingredient => 
        `${ingredient.quantity}${ingredient.unit} ${ingredient.name}`
      );
    }
    
    // Save the updated meal
    const updatedMeal = await meal.save();
    
    res.json({
      message: 'Meal ingredients updated successfully',
      meal: updatedMeal
    });
  }),

  // Add a new ingredient to a meal
  addMealIngredient: asyncHandler(async (req, res) => {
    const { id: mealId } = req.params;
    const { 
      foodItemId, 
      quantity, 
      unit,
      name,
      calories,
      protein,
      carbs,
      fats 
    } = req.body;
    
    if (!quantity || !unit || !name) {
      res.status(400);
      throw new Error('Quantity, unit, and name are required');
    }
    
    // Find the meal to update
    const meal = await Meal.findById(mealId);
    
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found');
    }
    
    // Create the new ingredient object with reference values for scaling
    const newIngredient = {
      foodItemId,
      quantity: parseFloat(parseFloat(quantity).toFixed(2)),
      unit,
      name: name.trim(),
      calories: parseFloat(parseFloat(calories || 0).toFixed(2)),
      protein: parseFloat(parseFloat(protein || 0).toFixed(2)),
      carbs: parseFloat(parseFloat(carbs || 0).toFixed(2)),
      fats: parseFloat(parseFloat(fats || 0).toFixed(2)),
      // Add reference values for future scaling
      referenceQuantity: parseFloat(parseFloat(quantity).toFixed(2)),
      referenceCalories: parseFloat(parseFloat(calories || 0).toFixed(2)),
      referenceProtein: parseFloat(parseFloat(protein || 0).toFixed(2)),
      referenceCarbs: parseFloat(parseFloat(carbs || 0).toFixed(2)),
      referenceFats: parseFloat(parseFloat(fats || 0).toFixed(2))
    };
    
    // Initialize structuredIngredients if it doesn't exist
    if (!meal.structuredIngredients) {
      meal.structuredIngredients = [];
    }
    
    // Add the new ingredient
    meal.structuredIngredients.push(newIngredient);
    
    // Add to string ingredients for backward compatibility
    if (!meal.ingredients) {
      meal.ingredients = [];
    }
    meal.ingredients.push(`${quantity}${unit} ${name}`);
    
    // Use sanitizeMealNutrition to consistently recalculate nutrition
    sanitizeMealNutrition(meal);
    
    // Mark as customized and update modification time
    meal.isCustomized = true;
    meal.lastModified = new Date();
    
    // Save the updated meal
    const updatedMeal = await meal.save();
    
    console.log(`Added ingredient ${name} to meal ${meal.name}`);
    console.log(`Updated meal nutrition: Cal=${meal.calories}, P=${meal.protein}g, C=${meal.carbs}g, F=${meal.fats}g`);
    
    res.json({
      message: 'Ingredient added successfully',
      meal: updatedMeal
    });
  }),

  // Update a specific ingredient in a meal
  updateMealIngredient: asyncHandler(async (req, res) => {
    const { id: mealId, ingredientIndex } = req.params;
    const { quantity, unit } = req.body;
    
    if (!quantity) {
      res.status(400);
      throw new Error('Quantity is required');
    }
    
    // Find the meal to update
    const meal = await Meal.findById(mealId);
    
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found');
    }
    
    // Check if structured ingredients exist and the index is valid
    if (!meal.structuredIngredients || 
        !meal.structuredIngredients[ingredientIndex]) {
      res.status(404);
      throw new Error('Ingredient not found');
    }
    
    // Get the ingredient and sanitize values
    const ingredient = meal.structuredIngredients[ingredientIndex];
    const parsedQuantity = parseFloat(parseFloat(quantity).toFixed(2));
    
    // Update the ingredient quantity
    ingredient.quantity = parsedQuantity;
    
    // Update unit if provided
    if (unit) {
      ingredient.unit = unit;
    }
    
    // Calculate new nutrition values based on reference values if available
    if (ingredient.referenceQuantity && 
        ingredient.referenceCalories !== undefined &&
        ingredient.referenceProtein !== undefined &&
        ingredient.referenceCarbs !== undefined &&
        ingredient.referenceFats !== undefined) {
      
      // Scale nutrition based on reference values
      const scaleFactor = parsedQuantity / ingredient.referenceQuantity;
      ingredient.calories = parseFloat((ingredient.referenceCalories * scaleFactor).toFixed(2));
      ingredient.protein = parseFloat((ingredient.referenceProtein * scaleFactor).toFixed(2));
      ingredient.carbs = parseFloat((ingredient.referenceCarbs * scaleFactor).toFixed(2));
      ingredient.fats = parseFloat((ingredient.referenceFats * scaleFactor).toFixed(2));
      
      console.log(`Scaled nutrition for ingredient ${ingredient.name} using reference values (factor: ${scaleFactor})`);
    } else {
      // If no reference values, set current values as reference
      ingredient.referenceQuantity = parsedQuantity;
      ingredient.referenceCalories = ingredient.calories;
      ingredient.referenceProtein = ingredient.protein;
      ingredient.referenceCarbs = ingredient.carbs;
      ingredient.referenceFats = ingredient.fats;
      
      console.log(`No reference values for ${ingredient.name}, setting current values as reference`);
    }
    
    // Update string ingredients for backward compatibility
    if (meal.ingredients && meal.ingredients[ingredientIndex]) {
      meal.ingredients[ingredientIndex] = `${parsedQuantity}${ingredient.unit} ${ingredient.name}`;
    }
    
    // Use sanitizeMealNutrition to consistently recalculate nutrition
    sanitizeMealNutrition(meal);
    
    // Mark as customized and update modification time
    meal.isCustomized = true;
    meal.lastModified = new Date();
    
    // Save the updated meal
    const updatedMeal = await meal.save();
    
    console.log(`Updated ingredient ${ingredient.name} in meal ${meal.name}`);
    console.log(`New quantity: ${parsedQuantity}${ingredient.unit}, Nutrition: Cal=${ingredient.calories}, P=${ingredient.protein}g, C=${ingredient.carbs}g, F=${ingredient.fats}g`);
    console.log(`Updated meal nutrition: Cal=${meal.calories}, P=${meal.protein}g, C=${meal.carbs}g, F=${meal.fats}g`);
    
    res.json({
      message: 'Ingredient updated successfully',
      meal: updatedMeal
    });
  }),

  // Remove an ingredient from a meal
  removeMealIngredient: asyncHandler(async (req, res) => {
    const { id: mealId, ingredientIndex } = req.params;
    
    // Find the meal to update
    const meal = await Meal.findById(mealId);
    
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found');
    }
    
    // Check if structured ingredients exist and the index is valid
    if (!meal.structuredIngredients || 
        !meal.structuredIngredients[ingredientIndex]) {
      res.status(404);
      throw new Error('Ingredient not found');
    }
    
    // Get the ingredient name before removing it
    const ingredientName = meal.structuredIngredients[ingredientIndex].name;
    
    // Remove the ingredient
    meal.structuredIngredients.splice(ingredientIndex, 1);
    
    // Remove from string ingredients for backward compatibility
    if (meal.ingredients && meal.ingredients[ingredientIndex]) {
      meal.ingredients.splice(ingredientIndex, 1);
    }
    
    // Use sanitizeMealNutrition to consistently recalculate nutrition
    sanitizeMealNutrition(meal);
    
    // Mark as customized and update modification time
    meal.isCustomized = true;
    meal.lastModified = new Date();
    
    // Save the updated meal
    const updatedMeal = await meal.save();
    
    console.log(`Removed ingredient ${ingredientName} from meal ${meal.name}`);
    console.log(`Updated meal nutrition: Cal=${meal.calories}, P=${meal.protein}g, C=${meal.carbs}g, F=${meal.fats}g`);
    console.log(`Remaining ingredients: ${meal.structuredIngredients.length}`);
    
    res.json({
      message: 'Ingredient removed successfully',
      meal: updatedMeal
    });
  }),

  // Migrate string ingredients to structured ingredients
  migrateMealIngredients: asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    try {
      console.log(`Attempting to migrate ingredients for meal ${id}`);
      console.log(`DEBUG - Helper functions: estimateNutritionValues defined? ${typeof estimateNutritionValues}`);
      console.log(`DEBUG - Helper functions: calculateNutritionTotals defined? ${typeof calculateNutritionTotals}`);
      console.log(`DEBUG - Helper functions: createDefaultIngredientsFromMealName defined? ${typeof createDefaultIngredientsFromMealName}`);
      console.log(`DEBUG - Object context: estimateNutritionValues defined? ${typeof this.estimateNutritionValues}`);
      console.log(`DEBUG - Object context: calculateNutritionTotals defined? ${typeof this.calculateNutritionTotals}`);
      console.log(`DEBUG - Object context: createDefaultIngredientsFromMealName defined? ${typeof this.createDefaultIngredientsFromMealName}`);
      
      // Find the meal
      const meal = await Meal.findById(id);
      if (!meal) {
        console.error(`Meal ${id} not found`);
        res.status(404);
        throw new Error('Meal not found');
      }
      
      // Skip if already has structured ingredients
      if (meal.structuredIngredients && meal.structuredIngredients.length > 0) {
        console.log(`Meal ${id} already has ${meal.structuredIngredients.length} structured ingredients`);
        return res.json({
          message: 'Meal already has structured ingredients',
          meal
        });
      }
      
      // Check if meal has ingredients property and it's an array
      if (!meal.ingredients || !Array.isArray(meal.ingredients) || meal.ingredients.length === 0) {
        console.warn(`Meal ${id} has no ingredients array or it's empty`);
        
        // Create default ingredients based on meal name if possible
        const defaultIngredients = planController.createDefaultIngredientsFromMealName(meal.name);
        
        if (defaultIngredients.length > 0) {
          console.log(`Created ${defaultIngredients.length} default ingredients based on meal name`);
          meal.structuredIngredients = defaultIngredients;
          
          // Use sanitizeMealNutrition to consistently recalculate nutrition
          sanitizeMealNutrition(meal);
          
          const updatedMeal = await meal.save();
          return res.json({
            message: 'Created default structured ingredients based on meal name',
            meal: updatedMeal
          });
        }
        
        // Initialize structured ingredients as empty array
        meal.structuredIngredients = [];
        const updatedMeal = await meal.save();
        return res.json({
          message: 'Created empty structured ingredients array',
          meal: updatedMeal
        });
      }
      
      // Parse string ingredients to structured format
      const structuredIngredients = [];
      let successfulParses = 0;
      let fallbackParses = 0;
      let skippedItems = 0;
      
      // Valid unit values for the schema
      const validUnitValues = ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving'];
      
      // Improved regex to extract quantity, unit, and name - handles more formats
      // Matches patterns like: "1 cup rice", "1.5 cups of rice", "100g chicken", "1/2 tsp salt"
      const ingredientRegex = /^([\d./]+)?\s*([a-zA-Z]+)?\s*(?:of\s+)?(.+)$/i;
      
      for (const ingredientStr of meal.ingredients) {
        try {
          if (!ingredientStr || typeof ingredientStr !== 'string' || ingredientStr.trim() === '') {
            console.warn(`Skipping empty or invalid ingredient: "${ingredientStr}"`);
            skippedItems++;
            continue;
          }
          
          const trimmedStr = ingredientStr.trim();
          const matches = trimmedStr.match(ingredientRegex);
          
          if (matches && matches.length >= 4) {
            let [_, quantityStr, unit, name] = matches;
            
            // Handle quantity parsing including fractions like 1/2
            let quantity = 1; // Default to 1 if unspecified
            if (quantityStr) {
              if (quantityStr.includes('/')) {
                const [numerator, denominator] = quantityStr.split('/');
                quantity = parseFloat(numerator) / parseFloat(denominator);
              } else {
                quantity = parseFloat(quantityStr);
              }
              
              // Safety check for NaN
              if (isNaN(quantity)) quantity = 1;
            }
            
            // Normalize and validate unit (critical for avoiding schema validation errors)
            let normalizedUnit = 'serving'; // Default to serving
            
            if (unit) {
              const unitLower = unit.toLowerCase();
              
              // Map common unit variations to valid schema values
              if (['g', 'gram', 'grams'].includes(unitLower)) {
                normalizedUnit = 'g';
              } else if (['ml', 'milliliter', 'milliliters'].includes(unitLower)) {
                normalizedUnit = 'ml';
              } else if (['l', 'liter', 'liters'].includes(unitLower)) {
                normalizedUnit = 'ml'; // Convert to ml
              } else if (['tbsp', 'tablespoon', 'tablespoons'].includes(unitLower)) {
                normalizedUnit = 'tbsp';
              } else if (['tsp', 'teaspoon', 'teaspoons'].includes(unitLower)) {
                normalizedUnit = 'tsp';
              } else if (['cup', 'cups'].includes(unitLower)) {
                normalizedUnit = 'cup';
              } else if (['oz', 'ounce', 'ounces'].includes(unitLower)) {
                normalizedUnit = 'oz';
              } else if (['piece', 'pieces', 'slice', 'slices'].includes(unitLower)) {
                normalizedUnit = 'piece';
              } else if (['kg', 'kilogram', 'kilograms'].includes(unitLower)) {
                normalizedUnit = 'g'; // Convert to grams
                quantity = quantity * 1000; // Convert kg to g
              } else if (['lb', 'pound', 'pounds'].includes(unitLower)) {
                normalizedUnit = 'g'; // Convert to grams
                quantity = quantity * 453.592; // Convert pounds to grams
              } else if (['serving', 'servings'].includes(unitLower)) {
                normalizedUnit = 'serving';
              } else {
                // For any other unit (like 'brioche'), use 'serving' and include it in the name
                console.log(`Found invalid unit '${unit}' in ingredient '${ingredientStr}', using 'serving' instead`);
                if (name) {
                  // If the "unit" is actually part of the name (like "brioche bread"), include it in the name
                  name = `${unit} ${name}`;
                }
                normalizedUnit = 'serving';
              }
            }
            
            // Final validation check - ensure the unit is one of the valid values
            if (!validUnitValues.includes(normalizedUnit)) {
                console.warn(`Unit '${normalizedUnit}' is not valid, defaulting to 'serving'`);
                normalizedUnit = 'serving';
            }
            
            // Clean up name
            name = name.trim();
            
            // Get nutrition estimates based on the ingredient name
            const estimatedNutrition = planController.estimateNutritionValues(name, quantity, normalizedUnit);
            
            structuredIngredients.push({
              name,
              quantity,
              unit: normalizedUnit,
              calories: estimatedNutrition.calories,
              protein: estimatedNutrition.protein,
              carbs: estimatedNutrition.carbs,
              fats: estimatedNutrition.fats,
              originalString: ingredientStr,
              // Add reference values for future scaling
              referenceQuantity: quantity,
              referenceCalories: estimatedNutrition.calories,
              referenceProtein: estimatedNutrition.protein,
              referenceCarbs: estimatedNutrition.carbs,
              referenceFats: estimatedNutrition.fats
            });
            
            successfulParses++;
          } else {
            // Advanced fallback - try to identify unit and quantity
            const result = planController.extractIngredientDetailsFallback(trimmedStr);
            
            // Ensure the unit is valid for the schema
            if (!validUnitValues.includes(result.unit)) {
              console.warn(`Fallback extracted invalid unit '${result.unit}', defaulting to 'serving'`);
              result.unit = 'serving';
            }
            
            structuredIngredients.push({
              name: result.name,
              quantity: result.quantity,
              unit: result.unit,
              calories: result.calories,
              protein: result.protein,
              carbs: result.carbs,
              fats: result.fats,
              originalString: ingredientStr,
              // Add reference values for future scaling
              referenceQuantity: result.quantity,
              referenceCalories: result.calories,
              referenceProtein: result.protein,
              referenceCarbs: result.carbs,
              referenceFats: result.fats
            });
            
            fallbackParses++;
          }
        } catch (ingredientError) {
          console.error(`Error parsing ingredient "${ingredientStr}":`, ingredientError);
          
          // Add a very basic fallback even if parsing completely fails
          structuredIngredients.push({
            name: typeof ingredientStr === 'string' ? ingredientStr.trim() : 'Unknown ingredient',
            quantity: 1,
            unit: 'serving', // Always use a valid unit
            calories: 50,  // Generic default values
            protein: 1,
            carbs: 5,
            fats: 2,
            originalString: ingredientStr,
            // Add reference values for future scaling
            referenceQuantity: 1,
            referenceCalories: 50,
            referenceProtein: 1,
            referenceCarbs: 5,
            referenceFats: 2
          });
          
          fallbackParses++;
        }
      }
      
      console.log(`Ingredient migration results - Success: ${successfulParses}, Fallback: ${fallbackParses}, Skipped: ${skippedItems}`);
      
      if (structuredIngredients.length === 0) {
        // If we couldn't parse anything, create a default
        structuredIngredients.push({
          name: meal.name,
          quantity: 1,
          unit: 'serving',
          calories: meal.calories || 100,
          protein: meal.protein || 5,
          carbs: meal.carbs || 10,
          fats: meal.fats || 5,
          originalString: `1 serving of ${meal.name}`,
          // Add reference values for future scaling
          referenceQuantity: 1,
          referenceCalories: meal.calories || 100,
          referenceProtein: meal.protein || 5,
          referenceCarbs: meal.carbs || 10,
          referenceFats: meal.fats || 5
        });
        console.log('Created a single default ingredient when parsing failed completely');
      }
      
      // Update the meal with structured ingredients
      meal.structuredIngredients = structuredIngredients;
      
      // Use sanitizeMealNutrition to consistently recalculate nutrition
      sanitizeMealNutrition(meal);
      
      // Save the updated meal
      const updatedMeal = await meal.save();
      
      res.json({
        message: 'Ingredients migrated successfully',
        meal: updatedMeal,
        stats: {
          successful: successfulParses,
          fallback: fallbackParses,
          skipped: skippedItems,
          total: structuredIngredients.length
        }
      });
    } catch (error) {
      console.error(`Error migrating ingredients for meal ${id}:`, error);
      res.status(500).json({
        message: 'Failed to migrate ingredients',
        error: error.message
      });
    }
  }),

  // Helper function to normalize units
  normalizeUnit: function(unit) {
    if (!unit) return 'serving';
    
    const unitMap = {
      'g': 'g',
      'gram': 'g',
      'grams': 'g',
      'kg': 'kg',
      'kilogram': 'kg',
      'kilograms': 'kg',
      'ml': 'ml',
      'milliliter': 'ml',
      'milliliters': 'ml',
      'l': 'l',
      'liter': 'l',
      'liters': 'l',
      'tbsp': 'tbsp',
      'tablespoon': 'tbsp',
      'tablespoons': 'tbsp',
      'tsp': 'tsp',
      'teaspoon': 'tsp',
      'teaspoons': 'tsp',
      'cup': 'cup',
      'cups': 'cup',
      'oz': 'oz',
      'ounce': 'oz',
      'ounces': 'oz',
      'lb': 'lb',
      'pound': 'lb',
      'pounds': 'lb',
      'piece': 'piece',
      'pieces': 'piece',
      'slice': 'slice',
      'slices': 'slice',
      'serving': 'serving',
      'servings': 'serving'
    };
    
    const normalized = unitMap[unit.toLowerCase()];
    return normalized || 'serving';
  },

  // Advanced fallback parser for when regex fails
  extractIngredientDetailsFallback: function(ingredientStr) {
    // Default values
    let result = {
      name: ingredientStr,
      quantity: 1,
      unit: 'serving',
      calories: 50,
      protein: 2,
      carbs: 5,
      fats: 2
    };
    
    // List of valid units according to the schema
    const validUnits = ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving'];
    
    // Common units to look for
    const unitPatterns = [
      'g', 'gram', 'grams', 'kg', 
      'ml', 'l', 'cup', 'cups', 
      'tbsp', 'tsp', 'oz', 'lb',
      'slice', 'piece', 'serving'
    ];
    
    try {
      // Look for numbers at the beginning
      const numberMatch = ingredientStr.match(/^[\d./]+/);
      if (numberMatch) {
        const quantityStr = numberMatch[0];
        if (quantityStr.includes('/')) {
          const [numerator, denominator] = quantityStr.split('/');
          result.quantity = parseFloat(numerator) / parseFloat(denominator);
        } else {
          result.quantity = parseFloat(quantityStr);
        }
        
        // If we found a number, remove it from the string
        const remaining = ingredientStr.substring(numberMatch[0].length).trim();
        
        // Check for units
        for (const unitPattern of unitPatterns) {
          const unitRegex = new RegExp(`^\\s*${unitPattern}\\s+(.+)$|^\\s*${unitPattern}s\\s+(.+)$`, 'i');
          const unitMatch = remaining.match(unitRegex);
          
          if (unitMatch) {
            // Map the unit to valid schema values
            let mappedUnit = 'serving'; // Default
            const unitLower = unitPattern.toLowerCase();
            
            if (unitLower === 'g' || unitLower === 'gram' || unitLower === 'grams') {
              mappedUnit = 'g';
            } else if (unitLower === 'ml' || unitLower === 'milliliter' || unitLower === 'milliliters') {
              mappedUnit = 'ml';
            } else if (unitLower === 'l' || unitLower === 'liter' || unitLower === 'liters') {
              mappedUnit = 'ml'; // Convert to ml
              result.quantity *= 1000; // Convert L to ml
            } else if (unitLower === 'tbsp' || unitLower === 'tablespoon' || unitLower === 'tablespoons') {
              mappedUnit = 'tbsp';
            } else if (unitLower === 'tsp' || unitLower === 'teaspoon' || unitLower === 'teaspoons') {
              mappedUnit = 'tsp';
            } else if (unitLower === 'cup' || unitLower === 'cups') {
              mappedUnit = 'cup';
            } else if (unitLower === 'oz' || unitLower === 'ounce' || unitLower === 'ounces') {
              mappedUnit = 'oz';
            } else if (unitLower === 'piece' || unitLower === 'pieces' || unitLower === 'slice' || unitLower === 'slices') {
              mappedUnit = 'piece';
            } else if (unitLower === 'serving' || unitLower === 'servings') {
              mappedUnit = 'serving';
            } else if (unitLower === 'kg' || unitLower === 'kilogram' || unitLower === 'kilograms') {
              mappedUnit = 'g';
              result.quantity *= 1000; // Convert kg to g
            } else if (unitLower === 'lb' || unitLower === 'pound' || unitLower === 'pounds') {
              mappedUnit = 'g';
              result.quantity *= 453.592; // Convert pounds to g
            }
            
            // Ensure unit is one of the valid options
            if (!validUnits.includes(mappedUnit)) {
              console.warn(`Invalid unit '${mappedUnit}' detected, using 'serving' instead`);
              mappedUnit = 'serving';
            }
            
            result.unit = mappedUnit;
            result.name = (unitMatch[1] || unitMatch[2]).trim();
            
            // Estimate nutrition based on the extracted name and quantity
            const estimatedNutrition = estimateNutritionValues(result.name, result.quantity, result.unit);
            result.calories = estimatedNutrition.calories;
            result.protein = estimatedNutrition.protein;
            result.carbs = estimatedNutrition.carbs;
            result.fats = estimatedNutrition.fats;
            
            return result;
          }
        }
        
        // If we found a number but no unit, use the remaining text as the name
        result.name = remaining;
      }
      
      // Estimate nutrition based on the name
      const estimatedNutrition = estimateNutritionValues(result.name, result.quantity, result.unit);
      result.calories = estimatedNutrition.calories;
      result.protein = estimatedNutrition.protein;
      result.carbs = estimatedNutrition.carbs;
      result.fats = estimatedNutrition.fats;
      
      // Final check to ensure unit is valid
      if (!validUnits.includes(result.unit)) {
        console.warn(`Invalid unit '${result.unit}' detected in final result, using 'serving' instead`);
        result.unit = 'serving';
      }
      
      return result;
    } catch (error) {
      console.error('Error in fallback extraction:', error);
      // Always return a valid unit
      result.unit = 'serving';
      return result;
    }
  },

  // Calculate nutrition totals from a list of ingredients
  calculateNutritionTotals: function(ingredients) {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };
    
    ingredients.forEach(ing => {
      totals.calories += ing.calories || 0;
      totals.protein += ing.protein || 0;
      totals.carbs += ing.carbs || 0;
      totals.fats += ing.fats || 0;
    });
    
    // Round appropriately
    totals.calories = Math.round(totals.calories);
    totals.protein = Number(totals.protein.toFixed(1));
    totals.carbs = Number(totals.carbs.toFixed(1));
    totals.fats = Number(totals.fats.toFixed(1));
    
    return totals;
  },

  // Create default ingredients based on meal name
  createDefaultIngredientsFromMealName: function(mealName) {
    if (!mealName) return [];
    
    // Valid units according to the schema
    const validUnits = ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving'];
    
    // Simple default mapping for common meals
    const mealMap = {
      'oatmeal': [{ name: 'oats', quantity: 50, unit: 'g', calories: 180, protein: 6, carbs: 30, fats: 3 }],
      'eggs': [{ name: 'eggs', quantity: 2, unit: 'piece', calories: 140, protein: 12, carbs: 0, fats: 10 }],
      'chicken': [{ name: 'chicken breast', quantity: 100, unit: 'g', calories: 165, protein: 31, carbs: 0, fats: 3.6 }],
      'salmon': [{ name: 'salmon fillet', quantity: 100, unit: 'g', calories: 206, protein: 22, carbs: 0, fats: 13 }],
      'rice': [{ name: 'rice', quantity: 50, unit: 'g', calories: 170, protein: 3, carbs: 37, fats: 0.3 }],
      'salad': [
        { name: 'mixed greens', quantity: 100, unit: 'g', calories: 25, protein: 2, carbs: 5, fats: 0 },
        { name: 'olive oil', quantity: 1, unit: 'tbsp', calories: 120, protein: 0, carbs: 0, fats: 14 }
      ]
    };
    
    // Check if meal name contains any of the keywords
    const lowerName = mealName.toLowerCase();
    for (const [key, ingredients] of Object.entries(mealMap)) {
      if (lowerName.includes(key)) {
        // Verify all units are valid before returning
        const validatedIngredients = ingredients.map(ing => {
          // Ensure unit is valid
          if (!validUnits.includes(ing.unit)) {
            console.warn(`Invalid unit '${ing.unit}' in default ingredient template, replacing with 'serving'`);
            ing.unit = 'serving';
          }
          return {
            ...ing,
            originalString: `${ing.quantity}${ing.unit} ${ing.name}`
          };
        });
        return validatedIngredients;
      }
    }
    
    // If no match, create a generic ingredient
    return [{
      name: mealName,
      quantity: 1,
      unit: 'serving', // Always use a valid unit
      calories: 200,
      protein: 10,
      carbs: 20,
      fats: 8,
      originalString: `1 serving of ${mealName}`
    }];
  },

  // Estimate nutrition values based on ingredient name
  estimateNutritionValues: function(name, quantity, unit) {
    // Default values per serving
    const baseValues = {
      calories: 50,
      protein: 2,
      carbs: 5,
      fats: 2
    };
    
    // Common food categories with typical nutrition values
    const foodDatabase = {
      // Proteins
      'chicken': { cal: 165, p: 31, c: 0, f: 3.6, perUnit: 100, unit: 'g' },
      'beef': { cal: 250, p: 26, c: 0, f: 17, perUnit: 100, unit: 'g' },
      'fish': { cal: 206, p: 22, c: 0, f: 13, perUnit: 100, unit: 'g' },
      'salmon': { cal: 206, p: 22, c: 0, f: 13, perUnit: 100, unit: 'g' },
      'tuna': { cal: 145, p: 30, c: 0, f: 2, perUnit: 100, unit: 'g' },
      'egg': { cal: 70, p: 6, c: 0, f: 5, perUnit: 1, unit: 'piece' },
      'tofu': { cal: 80, p: 8, c: 2, f: 4, perUnit: 100, unit: 'g' },
      
      // Carbs
      'rice': { cal: 170, p: 3, c: 37, f: 0.3, perUnit: 50, unit: 'g' },
      'pasta': { cal: 180, p: 6, c: 36, f: 1, perUnit: 50, unit: 'g' },
      'potato': { cal: 130, p: 3, c: 30, f: 0, perUnit: 100, unit: 'g' },
      'bread': { cal: 80, p: 3, c: 15, f: 1, perUnit: 1, unit: 'slice' },
      'oats': { cal: 180, p: 6, c: 30, f: 3, perUnit: 50, unit: 'g' },
      
      // Fruits & Vegetables
      'apple': { cal: 95, p: 0.5, c: 25, f: 0.3, perUnit: 1, unit: 'piece' },
      'banana': { cal: 105, p: 1.3, c: 27, f: 0.4, perUnit: 1, unit: 'piece' },
      'spinach': { cal: 25, p: 3, c: 4, f: 0.4, perUnit: 100, unit: 'g' },
      'broccoli': { cal: 55, p: 4, c: 11, f: 0.5, perUnit: 100, unit: 'g' },
      
      // Fats
      'olive oil': { cal: 120, p: 0, c: 0, f: 14, perUnit: 1, unit: 'tbsp' },
      'butter': { cal: 100, p: 0, c: 0, f: 11, perUnit: 1, unit: 'tbsp' },
      'avocado': { cal: 240, p: 3, c: 12, f: 22, perUnit: 1, unit: 'piece' },
      'nuts': { cal: 170, p: 5, c: 6, f: 15, perUnit: 28, unit: 'g' },
      
      // Dairy
      'milk': { cal: 150, p: 8, c: 12, f: 8, perUnit: 1, unit: 'cup' },
      'yogurt': { cal: 150, p: 8, c: 15, f: 8, perUnit: 1, unit: 'cup' },
      'cheese': { cal: 110, p: 7, c: 1, f: 9, perUnit: 28, unit: 'g' }
    };
    
    // Look for a match in the food database
    const lowerName = name.toLowerCase();
    let match = null;
    
    for (const [key, values] of Object.entries(foodDatabase)) {
      if (lowerName.includes(key)) {
        match = values;
        break;
      }
    }
    
    if (match) {
      // Calculate scaling factor based on quantity and unit
      let scaleFactor = quantity;
      
      // Adjust for unit differences
      if (unit !== match.unit) {
        if (unit === 'g' && match.unit === 'piece') {
          // Convert pieces to grams (rough estimates)
          scaleFactor = quantity / 100; // Assume 100g per piece
        } else if (unit === 'piece' && match.unit === 'g') {
          // Convert grams to pieces
          scaleFactor = quantity * 100; // Assume 100g per piece
        }
        // Add other unit conversions as needed
      }
      
      // Calculate based on perUnit
      scaleFactor = scaleFactor / match.perUnit;
      
      return {
        calories: Math.round(match.cal * scaleFactor),
        protein: Number((match.p * scaleFactor).toFixed(1)),
        carbs: Number((match.c * scaleFactor).toFixed(1)),
        fats: Number((match.f * scaleFactor).toFixed(1))
      };
    }
    
    // If no match, use generic values
    // Scale based on quantity and general assumptions
    let caloriesPerUnit = 50; // default calories per unit
    
    if (unit === 'g' || unit === 'ml') {
      caloriesPerUnit = 1;  // 1 calorie per gram/ml as a rough estimate
    } else if (unit === 'cup') {
      caloriesPerUnit = 200; // 200 calories per cup as a rough estimate
    } else if (unit === 'tbsp') {
      caloriesPerUnit = 45; // 45 calories per tablespoon
    } else if (unit === 'tsp') {
      caloriesPerUnit = 15; // 15 calories per teaspoon
    }
    
    const calories = Math.round(quantity * caloriesPerUnit);
    
    return {
      calories: calories,
      protein: Number((calories * 0.15 / 4).toFixed(1)), // 15% of calories from protein
      carbs: Number((calories * 0.5 / 4).toFixed(1)),   // 50% of calories from carbs
      fats: Number((calories * 0.35 / 9).toFixed(1))    // 35% of calories from fats
    };
  },

  // Add controller method for updating meal ingredients
  updateMealIngredients: asyncHandler(async (req, res) => {
    try {
      const { id: mealId } = req.params;
      const userId = req.user._id;
      
      // Handle both 'ingredients' and 'structuredIngredients' for backward compatibility
      let updatedIngredients = req.body.structuredIngredients;
      
      if (!updatedIngredients || !Array.isArray(updatedIngredients) || updatedIngredients.length === 0) {
        return res.status(400).json({
          message: 'structuredIngredients is required and must be an array'
        });
      }
      
      console.log(`Updating ingredients for meal ${mealId} with ${updatedIngredients.length} ingredients`);
      
      // Find the meal to update
      const meal = await Meal.findById(mealId);
      
      if (!meal) {
        return res.status(404).json({
          message: 'Meal not found'
        });
      }
      
      // Store original nutrition for logging
      const originalNutrition = {
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats
      };
      
      // Helper function to ensure value is a valid number
      const ensureValidNumber = (value, defaultValue = 0) => {
        const parsed = parseFloat(value);
        return !isNaN(parsed) && isFinite(parsed) ? parsed : defaultValue;
      };

      // Clean and validate each ingredient before saving
      const processedIngredients = updatedIngredients.map(ingredient => {
        // Basic data validation
        const name = (ingredient.name || '').trim();
        const quantity = ensureValidNumber(ingredient.quantity, 1);
        
        // Apply reasonable limits based on unit
        let unit = ingredient.unit || 'serving';
        if (!['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving'].includes(unit)) {
          unit = 'serving';
        }
        
        // Set reasonable maximum quantities that make sense for each unit 
        const maxQuantities = {
          'g': 2000,      // 2kg is reasonable maximum
          'ml': 2000,     // 2L is reasonable maximum
          'oz': 64,       // 4 pounds is reasonable maximum
          'cup': 10,      // 10 cups is reasonable maximum
          'tbsp': 30,     // 30 tbsp is reasonable maximum
          'tsp': 50,      // 50 tsp is reasonable maximum
          'piece': 30,    // 30 pieces is reasonable maximum
          'serving': 10   // 10 servings is reasonable maximum
        };
        
        // Cap quantity based on unit type
        const cappedQuantity = Math.min(quantity, maxQuantities[unit] || 10);
        
        // Preserve reference values or set them from current values if missing
        const referenceQuantity = ensureValidNumber(ingredient.referenceQuantity, cappedQuantity);
        const referenceCalories = ensureValidNumber(ingredient.referenceCalories, ingredient.calories || 0);
        const referenceProtein = ensureValidNumber(ingredient.referenceProtein, ingredient.protein || 0);
        const referenceCarbs = ensureValidNumber(ingredient.referenceCarbs, ingredient.carbs || 0);
        const referenceFats = ensureValidNumber(ingredient.referenceFats, ingredient.fats || 0);
        
        // Calculate nutrition based on quantity and reference values
        // Only scale if reference values exist and quantity isn't zero
        let calories = ensureValidNumber(ingredient.calories, 0);
        let protein = ensureValidNumber(ingredient.protein, 0);
        let carbs = ensureValidNumber(ingredient.carbs, 0);
        let fats = ensureValidNumber(ingredient.fats, 0);
        
        if (referenceQuantity > 0 && referenceCalories >= 0) {
          const scaleFactor = cappedQuantity / referenceQuantity;
          
          calories = parseFloat((referenceCalories * scaleFactor).toFixed(1));
          protein = parseFloat((referenceProtein * scaleFactor).toFixed(1));
          carbs = parseFloat((referenceCarbs * scaleFactor).toFixed(1));
          fats = parseFloat((referenceFats * scaleFactor).toFixed(1));
          
          console.log(`Scaled ${name} by factor ${scaleFactor.toFixed(2)}: cal=${calories}, p=${protein}, c=${carbs}, f=${fats}`);
        }
        
        return {
          name,
          quantity: cappedQuantity,
          unit,
          calories,
          protein,
          carbs,
          fats,
          foodItemId: ingredient.foodItemId || undefined,
          referenceQuantity,
          referenceCalories,
          referenceProtein,
          referenceCarbs,
          referenceFats
        };
      });
      
      // Update the meal with processed ingredients
      meal.structuredIngredients = processedIngredients;
      
      // Generate string ingredients for backward compatibility 
      meal.ingredients = processedIngredients.map(ingredient => {
        return `${ingredient.quantity}${ingredient.unit} ${ingredient.name}`;
      });
      
      // Calculate total nutrition directly from ingredients
      const totalNutrition = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      };
      
      processedIngredients.forEach(ingredient => {
        totalNutrition.calories += ingredient.calories || 0;
        totalNutrition.protein += ingredient.protein || 0;
        totalNutrition.carbs += ingredient.carbs || 0;
        totalNutrition.fats += ingredient.fats || 0;
      });
      
      // Update meal nutrition values - round to 1 decimal place
      meal.calories = parseFloat(totalNutrition.calories.toFixed(1));
      meal.protein = parseFloat(totalNutrition.protein.toFixed(1));
      meal.carbs = parseFloat(totalNutrition.carbs.toFixed(1));
      meal.fats = parseFloat(totalNutrition.fats.toFixed(1));
      
      // Mark as customized and update modification timestamp
      meal.isCustomized = true;
      meal.lastModified = new Date();
      meal.userId = userId; // Assign the user ID to track ownership
      
      // Log the changes 
      console.log(`Raw nutrition totals: ${JSON.stringify(totalNutrition)}`);
      console.log(`NUTRITION CHANGE: ${JSON.stringify(originalNutrition)} → ${JSON.stringify({
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats
      })}`);
      
      // Save the updated meal
      const updatedMeal = await meal.save();
      console.log(`Meal saved with ID: ${updatedMeal._id}`);
            
      // CRITICAL: Update the user's custom diet plan to use this meal
      // This is what was missing before - we need to ensure the meal is added to the user's custom plan
      
      // First, get the user's plan
      const userPlan = await UserPlan.findOne({ userId });
      
      if (!userPlan) {
        console.error(`No user plan found for user ${userId} when updating meal`);
      } else {
        // Check if the user already has a custom diet plan
        let customPlan;
        if (userPlan.customDietPlanId) {
          customPlan = await CustomDietPlan.findById(userPlan.customDietPlanId);
        }
        
        if (!customPlan) {
          // If no custom plan exists, we need to create one based on their original plan
          const basePlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
          
          if (basePlan) {
            console.log(`Creating new custom plan for user ${userId} based on plan ${userPlan.dietPlanId}`);
            
            customPlan = new CustomDietPlan({
              userId,
              basePlanId: userPlan.dietPlanId,
              weekCycle: JSON.parse(JSON.stringify(basePlan.weekCycle)) // Deep copy
            });
            
            const savedCustomPlan = await customPlan.save();
            
            // Link the custom plan to the user's plan
            userPlan.customDietPlanId = savedCustomPlan._id;
            await userPlan.save();
            
            console.log(`Created and linked new custom plan ${savedCustomPlan._id} to user ${userId}`);
          } else {
            console.error(`Base plan ${userPlan.dietPlanId} not found for user ${userId}`);
          }
        }
        
        if (customPlan) {
          // Find which day and meal index in the custom plan corresponds to the meal being updated
          let found = false;
          
          // Get today's day number
          const startDate = new Date(userPlan.startDate);
          startDate.setHours(0, 0, 0, 0);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
          const dayNumber = daysSinceStart % 14; // Always use modulo 14 for 2-week meal cycles
          
          console.log(`Searching for meal ${mealId} in custom plan for day ${dayNumber}`);
          
          // Check if we have the meal in today's plan
          if (customPlan.weekCycle && customPlan.weekCycle[dayNumber]) {
            for (let i = 0; i < customPlan.weekCycle[dayNumber].length; i++) {
              const planMeal = customPlan.weekCycle[dayNumber][i];
              
              // If we find a meal with matching ID or name, update it
              if (
                (planMeal._id && planMeal._id.toString() === mealId) ||
                (planMeal.name === meal.name)
              ) {
                console.log(`Found matching meal at day ${dayNumber}, index ${i}`);
                
                // Replace with updated meal data
                customPlan.weekCycle[dayNumber][i] = {
                  ...updatedMeal.toObject(),
                  _id: updatedMeal._id  // Ensure ID is preserved
                };
                
                found = true;
                break;
              }
            }
          }
          
          if (found) {
            // Save the updated custom plan
            await customPlan.save();
            console.log(`Updated meal in custom plan for day ${dayNumber}`);
          } else {
            console.log(`Could not find meal ${mealId} in custom plan, day ${dayNumber}`);
          }
        }
      }
      
      // Return the updated meal
      res.status(200).json({
        message: 'Meal ingredients updated successfully',
        meal: updatedMeal
      });
    } catch (error) {
      console.error(`Error in updateMealIngredients: ${error.message}`);
      console.error(error.stack);
      res.status(500).json({
        message: 'Failed to update meal ingredients',
        error: error.message
      });
    }
  }),

  // Debug endpoint to view detailed meal information
  getMealDetails: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the meal
    const meal = await Meal.findById(id);
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found');
    }

    // Add extra debug information
    const mealInfo = meal.toObject();
    mealInfo.debug = {
      hasStructuredIngredients: meal.structuredIngredients && meal.structuredIngredients.length > 0,
      structuredIngredientsCount: meal.structuredIngredients ? meal.structuredIngredients.length : 0,
      stringIngredientsCount: meal.ingredients ? meal.ingredients.length : 0,
      isCustomized: !!meal.isCustomized,
      lastModified: meal.lastModified ? meal.lastModified.toISOString() : null,
      hasReferenceValues: meal.structuredIngredients && meal.structuredIngredients.length > 0 && 
                         meal.structuredIngredients[0].referenceQuantity !== undefined
    };

    res.status(200).json({
      meal: mealInfo
    });
  }),

  getSwapOptions: asyncHandler(async (req, res) => {
    const mealId = req.params.mealId;
    const userId = req.user._id;
    console.log(`Getting swap options for meal ${mealId} for user ${userId}`);

    try {
      // Find the meal to be swapped
      const currentMeal = await Meal.findById(mealId);
      if (!currentMeal) {
        res.status(404);
        throw new Error('Meal not found');
      }

      // Get meal category and timing
      const { category, timing } = currentMeal;
      console.log(`Finding swap options for category: ${category}, timing: ${timing}`);

      // Find the user's plan
      const userPlan = await UserPlan.findOne({ userId });
      if (!userPlan) {
        res.status(404);
        throw new Error('User plan not found');
      }

      // Determine which diet plan to use (custom or base)
      let dietPlan;
      if (userPlan.customDietPlanId) {
        dietPlan = await CustomDietPlan.findById(userPlan.customDietPlanId);
        console.log('Using custom diet plan for swap options');
      }
      
      if (!dietPlan) {
        dietPlan = await DietPlan.findOne({ id: userPlan.dietPlanId });
        console.log('Using base diet plan for swap options');
      }

      if (!dietPlan) {
        res.status(404);
        throw new Error('Diet plan not found');
      }

      // Get all meals from all days in the diet plan
      const allMeals = dietPlan.weekCycle.flat();
      console.log(`Found ${allMeals.length} total meals in diet plan`);

      // Filter meals by category and timing, exclude the current meal
      let swapOptions = allMeals.filter(meal => 
        meal.category === category && 
        meal.timing === timing && 
        meal._id.toString() !== mealId
      );

      // Deduplicate meals by name
      const uniqueMeals = {};
      swapOptions.forEach(meal => {
        if (!uniqueMeals[meal.name]) {
          uniqueMeals[meal.name] = meal;
        }
      });
      swapOptions = Object.values(uniqueMeals);

      // Ensure structured ingredients are included for each meal
      const populatedOptions = [];
      
      for (const meal of swapOptions) {
        // Convert to plain object for manipulation
        const mealObj = meal.toObject ? meal.toObject() : { ...meal };
        
        // If the meal has structured ingredients already, use them
        if (mealObj.structuredIngredients && mealObj.structuredIngredients.length > 0) {
          populatedOptions.push(mealObj);
          continue;
        }
        
        // Otherwise, try to find the original meal with structured ingredients
        try {
          const originalMeal = await Meal.findById(mealObj._id);
          if (originalMeal && originalMeal.structuredIngredients && originalMeal.structuredIngredients.length > 0) {
            mealObj.structuredIngredients = originalMeal.structuredIngredients;
          } else {
            // If no structured ingredients are found, set as empty array
            mealObj.structuredIngredients = [];
          }
        } catch (error) {
          console.error(`Error fetching original meal ${mealObj._id}:`, error);
          mealObj.structuredIngredients = [];
        }
        
        populatedOptions.push(mealObj);
      }

      console.log(`Returning ${populatedOptions.length} swap options with structured ingredients`);
      res.status(200).json(populatedOptions);
    } catch (error) {
      console.error('Error getting swap options:', error);
      res.status(500);
      throw new Error('Error getting swap options: ' + error.message);
    }
  }),
};

module.exports = { planController };