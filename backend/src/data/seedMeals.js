const { Meal, DietPlan } = require('../models/Plan');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toasted';

// Connect to the database
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected for seeding meals');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

// Helper function to determine meal type based on name or timing
function determineMealType(meal) {
  // First check timing property
  if (meal.timing) {
    const timing = meal.timing.toLowerCase();
    if (timing.includes('breakfast')) return 'breakfast';
    if (timing.includes('lunch')) return 'lunch';
    if (timing.includes('dinner')) return 'dinner';
    if (timing.includes('snack')) return 'snack';
  }
  
  // Check meal name
  const name = meal.name.toLowerCase();
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
  
  // Default to snack if we can't determine
  return 'snack';
}

// Function to ensure meal has complete data
function ensureMealCompleteness(meal) {
  // Ensure meal has category
  if (!meal.category) {
    meal.category = 'home-cooked';
  }
  
  // Ensure meal has timing
  if (!meal.timing) {
    meal.timing = determineMealType(meal);
  }
  
  // Ensure meal has macronutrients (zero if missing)
  meal.calories = meal.calories || 0;
  meal.protein = meal.protein || 0;
  meal.carbs = meal.carbs || 0;
  meal.fats = meal.fats || 0;
  
  // Ensure meal has micronutrients structure
  if (!meal.micronutrients) {
    meal.micronutrients = {
      vitamins: {
        a: 0, c: 0, d: 0, e: 0,
        b1: 0, b2: 0, b3: 0, b6: 0, b12: 0, folate: 0
      },
      minerals: {
        calcium: 0, iron: 0, magnesium: 0, potassium: 0, zinc: 0, sodium: 0
      }
    };
  } else {
    // Ensure vitamins object exists and has all properties
    if (!meal.micronutrients.vitamins) {
      meal.micronutrients.vitamins = {
        a: 0, c: 0, d: 0, e: 0,
        b1: 0, b2: 0, b3: 0, b6: 0, b12: 0, folate: 0
      };
    } else {
      // Fill in any missing vitamin values
      meal.micronutrients.vitamins.a = meal.micronutrients.vitamins.a || 0;
      meal.micronutrients.vitamins.c = meal.micronutrients.vitamins.c || 0;
      meal.micronutrients.vitamins.d = meal.micronutrients.vitamins.d || 0;
      meal.micronutrients.vitamins.e = meal.micronutrients.vitamins.e || 0;
      meal.micronutrients.vitamins.b1 = meal.micronutrients.vitamins.b1 || 0;
      meal.micronutrients.vitamins.b2 = meal.micronutrients.vitamins.b2 || 0;
      meal.micronutrients.vitamins.b3 = meal.micronutrients.vitamins.b3 || 0;
      meal.micronutrients.vitamins.b6 = meal.micronutrients.vitamins.b6 || 0;
      meal.micronutrients.vitamins.b12 = meal.micronutrients.vitamins.b12 || 0;
      meal.micronutrients.vitamins.folate = meal.micronutrients.vitamins.folate || 0;
    }
    
    // Ensure minerals object exists and has all properties
    if (!meal.micronutrients.minerals) {
      meal.micronutrients.minerals = {
        calcium: 0, iron: 0, magnesium: 0, potassium: 0, zinc: 0, sodium: 0
      };
    } else {
      // Fill in any missing mineral values
      meal.micronutrients.minerals.calcium = meal.micronutrients.minerals.calcium || 0;
      meal.micronutrients.minerals.iron = meal.micronutrients.minerals.iron || 0;
      meal.micronutrients.minerals.magnesium = meal.micronutrients.minerals.magnesium || 0;
      meal.micronutrients.minerals.potassium = meal.micronutrients.minerals.potassium || 0;
      meal.micronutrients.minerals.zinc = meal.micronutrients.minerals.zinc || 0;
      meal.micronutrients.minerals.sodium = meal.micronutrients.minerals.sodium || 0;
    }
  }
  
  // Ensure meal has ingredients and instructions
  meal.ingredients = meal.ingredients || [];
  meal.instructions = meal.instructions || [];
  
  return meal;
}

// Extract all meals from diet plans and add them to the meals collection
async function extractAndSeedMealsFromPlans() {
  try {
    // Get all diet plans
    const dietPlans = await DietPlan.find({});
    console.log(`Found ${dietPlans.length} diet plans to extract meals from`);
    
    let allMeals = [];
    let mealCount = 0;
    
    // Extract meals from each plan
    for (const plan of dietPlans) {
      if (!plan.weekCycle || !Array.isArray(plan.weekCycle)) continue;
      
      // Loop through each day in the plan
      for (const dayMeals of plan.weekCycle) {
        if (!Array.isArray(dayMeals)) continue;
        
        // Loop through each meal in the day
        for (const meal of dayMeals) {
          if (!meal || !meal.name) continue;
          
          // Add the meal to our collection
          mealCount++;
          
          // Convert to object and ensure completeness
          const mealObj = meal.toObject ? meal.toObject() : {...meal};
          const completeMeal = ensureMealCompleteness(mealObj);
          
          allMeals.push(completeMeal);
        }
      }
    }
    
    console.log(`Extracted ${mealCount} meals from diet plans`);
    
    // Remove duplicate meals (based on name)
    const uniqueMeals = [];
    const mealNames = new Set();
    
    for (const meal of allMeals) {
      if (!mealNames.has(meal.name)) {
        mealNames.add(meal.name);
        uniqueMeals.push(meal);
      }
    }
    
    console.log(`Found ${uniqueMeals.length} unique meals after removing duplicates`);
    
    // Get existing meals to avoid duplicates
    const existingMeals = await Meal.find({});
    const existingMealNames = new Set(existingMeals.map(m => m.name));
    
    console.log(`Found ${existingMeals.length} existing meals in database`);
    
    // Filter out meals that already exist
    const newMeals = uniqueMeals.filter(meal => !existingMealNames.has(meal.name));
    
    console.log(`Adding ${newMeals.length} new meals to database`);
    
    if (newMeals.length > 0) {
      // Insert the new meals into the database
      await Meal.insertMany(newMeals);
      console.log(`Successfully added ${newMeals.length} new meals`);
    } else {
      console.log('No new meals were added (all already exist)');
    }
    
    // Verify the total number of meals in the database
    const totalMeals = await Meal.countDocuments();
    console.log(`Total meals in database: ${totalMeals}`);
    
  } catch (error) {
    console.error('Error seeding meals from plans:', error);
  }
}

// Main function to run the seeding
async function seedMealsFromPlans() {
  await connectDB();
  await extractAndSeedMealsFromPlans();
  console.log('Meal seeding complete');
  mongoose.disconnect();
}

// Run the seeding if this script is run directly
if (require.main === module) {
  seedMealsFromPlans();
}

module.exports = { seedMealsFromPlans }; 