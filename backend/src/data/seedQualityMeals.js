const mongoose = require('mongoose');
const { DietPlan, Meal } = require('../models/Plan');
require('dotenv').config();

// Helper function to determine meal timing based on position in day
function getMealTimingFromIndex(index) {
  switch(index) {
    case 0: return 'breakfast';
    case 1: return 'lunch';
    case 2: return 'dinner';
    default: return 'snack';
  }
}

// Helper function to determine meal type based on name or timing
function determineMealType(meal, index) {
  // First check timing property
  if (meal.timing) {
    const timing = meal.timing.toLowerCase();
    if (timing.includes('breakfast')) return 'breakfast';
    if (timing.includes('lunch')) return 'lunch';
    if (timing.includes('dinner')) return 'dinner';
    if (timing.includes('snack')) return 'snack';
  }
  
  // Check meal name
  const name = meal.name?.toLowerCase() || '';
  if (name.includes('breakfast') || name.includes('pancake') || name.includes('oatmeal') || 
      name.includes('cereal') || name.includes('waffle') || name.includes('egg') || 
      name.includes('muffin') || name.includes('toast')) {
    return 'breakfast';
  }
  
  if (name.includes('lunch') || name.includes('sandwich') || name.includes('wrap') || 
      name.includes('salad') || name.includes('soup')) {
    return 'lunch';
  }
  
  if (name.includes('dinner') || name.includes('steak') || name.includes('roast') || 
      name.includes('curry') || name.includes('casserole')) {
    return 'dinner';
  }
  
  if (name.includes('snack') || name.includes('bar') || name.includes('smoothie') || 
      name.includes('shake') || name.includes('nuts')) {
    return 'snack';
  }
  
  // Default based on position in day's meals
  return getMealTimingFromIndex(index);
}

// High-quality restaurant/takeout meal definitions with complete nutritional data
const restaurantMeals = [
  {
    name: "Chipotle Chicken Burrito Bowl",
    category: "restaurant",
    timing: "lunch",
    calories: 650,
    protein: 40,
    carbs: 65,
    fats: 25,
    ingredients: ["brown rice", "black beans", "grilled chicken", "fresh tomato salsa", "cheese", "lettuce"],
    instructions: ["Order from Chipotle"],
    notes: "High-protein lunch option from Chipotle"
  },
  {
    name: "McDonald's Egg McMuffin",
    category: "fast-food",
    timing: "breakfast",
    calories: 300,
    protein: 18,
    carbs: 30,
    fats: 12,
    ingredients: ["english muffin", "egg", "canadian bacon", "american cheese"],
    instructions: ["Order from McDonald's"],
    notes: "Classic breakfast sandwich"
  },
  {
    name: "Starbucks Protein Box",
    category: "restaurant",
    timing: "breakfast",
    calories: 470,
    protein: 24,
    carbs: 43,
    fats: 26,
    ingredients: ["eggs", "cheese", "grapes", "apples", "bread"],
    instructions: ["Purchase from Starbucks"],
    notes: "Convenient on-the-go breakfast option"
  },
  {
    name: "Subway Turkey Breast Sandwich",
    category: "restaurant",
    timing: "lunch",
    calories: 280,
    protein: 18,
    carbs: 46,
    fats: 3.5,
    ingredients: ["whole grain bread", "turkey breast", "lettuce", "tomato", "cucumber", "onion"],
    instructions: ["Order from Subway with preferred vegetables"],
    notes: "Low-fat sandwich option"
  },
  {
    name: "Panda Express Bowl",
    category: "restaurant",
    timing: "dinner",
    calories: 560,
    protein: 29,
    carbs: 80,
    fats: 12,
    ingredients: ["white rice", "broccoli beef", "orange chicken"],
    instructions: ["Order from Panda Express"],
    notes: "Popular Chinese fast casual option"
  },
  {
    name: "Taco Bell Power Menu Bowl",
    category: "fast-food",
    timing: "lunch",
    calories: 430,
    protein: 26,
    carbs: 51,
    fats: 13,
    ingredients: ["rice", "black beans", "grilled chicken", "lettuce", "guacamole", "salsa"],
    instructions: ["Order from Taco Bell"],
    notes: "Higher protein Taco Bell option"
  },
  {
    name: "Chick-fil-A Grilled Chicken Sandwich",
    category: "fast-food",
    timing: "lunch",
    calories: 320,
    protein: 28,
    carbs: 41,
    fats: 6,
    ingredients: ["multigrain bun", "grilled chicken", "lettuce", "tomato"],
    instructions: ["Order from Chick-fil-A"],
    notes: "Lower calorie chicken sandwich option"
  },
  {
    name: "Panera Bread Turkey Avocado BLT",
    category: "restaurant",
    timing: "lunch",
    calories: 560,
    protein: 34,
    carbs: 55,
    fats: 25,
    ingredients: ["sourdough bread", "turkey", "avocado", "bacon", "lettuce", "tomato"],
    instructions: ["Order from Panera Bread"],
    notes: "Hearty sandwich with healthy fats"
  },
  {
    name: "Sweetgreen Harvest Bowl",
    category: "restaurant",
    timing: "lunch",
    calories: 675,
    protein: 29,
    carbs: 77,
    fats: 31,
    ingredients: ["organic wild rice", "roasted chicken", "sweet potatoes", "apples", "goat cheese", "almonds", "balsamic vinaigrette"],
    instructions: ["Order from Sweetgreen"],
    notes: "Nutrient-dense salad bowl"
  },
  {
    name: "Tandoori Chicken Takeout",
    category: "takeout",
    timing: "dinner",
    calories: 400,
    protein: 45,
    carbs: 10,
    fats: 18,
    ingredients: ["chicken", "yogurt", "spices", "lemon"],
    instructions: ["Order from local Indian restaurant"],
    notes: "High-protein, low-carb dinner option"
  },
  {
    name: "Sushi Roll Combo",
    category: "takeout",
    timing: "dinner",
    calories: 550,
    protein: 30,
    carbs: 65,
    fats: 15,
    ingredients: ["rice", "nori", "tuna", "salmon", "cucumber", "avocado"],
    instructions: ["Order from local sushi restaurant"],
    notes: "Good balance of macronutrients"
  },
  {
    name: "Greek Salad with Grilled Chicken",
    category: "restaurant",
    timing: "lunch",
    calories: 460,
    protein: 35,
    carbs: 15,
    fats: 28,
    ingredients: ["romaine lettuce", "grilled chicken", "feta cheese", "olives", "cucumber", "red onion", "olive oil dressing"],
    instructions: ["Order from Greek restaurant or deli"],
    notes: "Low-carb, high-protein option"
  },
  {
    name: "Turkey and Avocado Protein Box",
    category: "restaurant",
    timing: "lunch",
    calories: 380,
    protein: 25,
    carbs: 30,
    fats: 18,
    ingredients: ["turkey slices", "cheese", "avocado", "hard-boiled egg", "grapes", "crackers"],
    instructions: ["Purchase from deli or prepare at home"],
    notes: "Perfect balanced snack box"
  },
  {
    name: "Poke Bowl",
    category: "restaurant",
    timing: "lunch",
    calories: 550,
    protein: 35,
    carbs: 60,
    fats: 18,
    ingredients: ["brown rice", "raw tuna", "avocado", "cucumber", "edamame", "seaweed", "soy sauce"],
    instructions: ["Order from poke restaurant"],
    notes: "High in omega-3 fatty acids"
  },
  {
    name: "Smoothie King High Protein Banana",
    category: "restaurant",
    timing: "breakfast",
    calories: 380,
    protein: 27,
    carbs: 57,
    fats: 5,
    ingredients: ["banana", "almond milk", "whey protein", "almonds"],
    instructions: ["Order from Smoothie King"],
    notes: "Good post-workout option"
  }
];

// Ensure meal has complete data and consistent formatting
function normalizeMeal(meal, index = 0) {
  // Create a deep copy to avoid modifying original
  const normalizedMeal = {...meal};
  
  // Ensure meal has name
  if (!normalizedMeal.name) {
    normalizedMeal.name = `Meal ${index + 1}`;
  }
  
  // Ensure meal has category
  if (!normalizedMeal.category) {
    normalizedMeal.category = 'home-cooked';
  }
  
  // Ensure meal has timing
  if (!normalizedMeal.timing) {
    normalizedMeal.timing = determineMealType(normalizedMeal, index);
  }
  
  // Ensure meal has macronutrients (zero if missing)
  normalizedMeal.calories = normalizedMeal.calories || 0;
  normalizedMeal.protein = normalizedMeal.protein || 0;
  normalizedMeal.carbs = normalizedMeal.carbs || 0;
  normalizedMeal.fats = normalizedMeal.fats || 0;
  
  // Ensure meal has ingredients and instructions arrays
  normalizedMeal.ingredients = normalizedMeal.ingredients || [];
  normalizedMeal.instructions = normalizedMeal.instructions || [];
  
  return normalizedMeal;
}

// Extract all meals from diet plans with proper metadata
async function extractOriginalMeals() {
  // Get all diet plans
  const dietPlans = await DietPlan.find({});
  console.log(`Found ${dietPlans.length} diet plans to extract meals from`);
  
  let allMeals = [];
  
  // Extract meals from each plan
  for (const plan of dietPlans) {
    if (!plan.weekCycle || !Array.isArray(plan.weekCycle)) continue;
    
    // Loop through each day in the plan
    for (let dayIndex = 0; dayIndex < plan.weekCycle.length; dayIndex++) {
      const dayMeals = plan.weekCycle[dayIndex];
      if (!Array.isArray(dayMeals)) continue;
      
      // Loop through each meal in the day
      for (let mealIndex = 0; mealIndex < dayMeals.length; mealIndex++) {
        const meal = dayMeals[mealIndex];
        if (!meal || !meal.name) continue;
        
        // Add timing based on meal position if not explicitly set
        if (!meal.timing) {
          meal.timing = getMealTimingFromIndex(mealIndex);
        }
        
        // Convert to object and normalize
        const mealObj = meal.toObject ? meal.toObject() : {...meal};
        const normalizedMeal = normalizeMeal(mealObj, mealIndex);
        
        // Only add meals with valid nutritional data
        if (normalizedMeal.calories > 0 || normalizedMeal.protein > 0) {
          allMeals.push(normalizedMeal);
        }
      }
    }
  }
  
  // Remove duplicate meals (based on name)
  const uniqueMeals = [];
  const mealNames = new Set();
  
  for (const meal of allMeals) {
    if (!mealNames.has(meal.name)) {
      mealNames.add(meal.name);
      uniqueMeals.push(meal);
    }
  }
  
  return uniqueMeals;
}

// Main function to seed quality meals
async function seedQualityMeals() {
  try {
    // Get existing meals to avoid duplicates
    const existingMeals = await Meal.find({});
    const existingMealNames = new Set(existingMeals.map(m => m.name));
    
    console.log(`Found ${existingMeals.length} existing meals in database`);
    
    // Extract meals from diet plans
    const extractedMeals = await extractOriginalMeals();
    console.log(`Extracted ${extractedMeals.length} meals from diet plans`);
    
    // Add restaurant meals
    const allMeals = [...extractedMeals, ...restaurantMeals];
    
    // Filter out meals that already exist
    const newMeals = allMeals.filter(meal => !existingMealNames.has(meal.name));
    
    console.log(`Adding ${newMeals.length} new quality meals to database`);
    
    // Insert the new meals
    if (newMeals.length > 0) {
      await Meal.insertMany(newMeals);
      console.log(`Successfully added ${newMeals.length} new meals`);
      
      // Log meal distribution by category and timing
      const mealStats = {
        categories: {},
        timing: {}
      };
      
      newMeals.forEach(meal => {
        // Count by category
        const category = meal.category || 'home-cooked';
        mealStats.categories[category] = (mealStats.categories[category] || 0) + 1;
        
        // Count by timing
        const timing = meal.timing || 'snack';
        mealStats.timing[timing] = (mealStats.timing[timing] || 0) + 1;
      });
      
      console.log('Meal distribution by category:', mealStats.categories);
      console.log('Meal distribution by timing:', mealStats.timing);
    } else {
      console.log('No new meals were added (all already exist)');
    }
    
    // Verify the total number of meals in the database
    const totalMeals = await Meal.countDocuments();
    console.log(`Total meals in database: ${totalMeals}`);
    
  } catch (error) {
    console.error('Error seeding quality meals:', error);
  }
}

// Run the seeding if this script is run directly
if (require.main === module) {
  // When run directly, use own connection
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toasted';
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB Connected for seeding quality meals');
      return seedQualityMeals();
    })
    .then(() => mongoose.disconnect())
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}

module.exports = { seedQualityMeals }; 