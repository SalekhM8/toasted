/**
 * This script creates sample tagged meals for the Advanced Plan Tailoring feature
 * Run with: node backend/scripts/createSampleMeals.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });
const { Meal } = require('../src/models/Plan');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const sampleMeals = [
  // High-protein, low-carb meals (good for weight loss, muscle building)
  {
    name: "Greek Yogurt Protein Bowl",
    timing: "breakfast",
    calories: 350,
    protein: 28,
    carbs: 20,
    fats: 15,
    ingredients: [
      "2 cups Greek yogurt",
      "1 tbsp honey",
      "1/4 cup mixed berries",
      "2 tbsp chopped almonds",
      "1 scoop vanilla protein powder"
    ],
    instructions: [
      "Mix Greek yogurt with protein powder until smooth",
      "Top with berries, almonds, and a drizzle of honey"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-carb"],
    suitableFor: ["diabetes-friendly"],
    dietaryTags: ["gluten-free", "vegetarian"],
    cuisine: "mediterranean",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  {
    name: "Grilled Chicken Salad with Avocado",
    timing: "lunch",
    calories: 450,
    protein: 40,
    carbs: 15,
    fats: 25,
    ingredients: [
      "6 oz grilled chicken breast",
      "3 cups mixed greens",
      "1/2 avocado, sliced",
      "1/4 cup cherry tomatoes",
      "2 tbsp olive oil and lemon dressing"
    ],
    instructions: [
      "Grill chicken until fully cooked",
      "Arrange mixed greens in a bowl",
      "Top with sliced chicken, avocado, and tomatoes",
      "Drizzle with olive oil and lemon dressing"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-carb", "high-fat"],
    suitableFor: ["diabetes-friendly", "heart-healthy"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 15,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  },
  
  // Vegetarian/Vegan options
  {
    name: "Lentil and Vegetable Curry",
    timing: "dinner",
    calories: 420,
    protein: 18,
    carbs: 60,
    fats: 12,
    ingredients: [
      "1 cup cooked lentils",
      "1 cup mixed vegetables (carrots, peas, cauliflower)",
      "1/2 cup coconut milk",
      "2 tbsp curry powder",
      "1 tbsp olive oil",
      "1 small onion, diced",
      "2 cloves garlic, minced"
    ],
    instructions: [
      "Sauté onion and garlic in olive oil until translucent",
      "Add curry powder and cook for 1 minute",
      "Add vegetables and cook for 5 minutes",
      "Add lentils and coconut milk",
      "Simmer for 10 minutes"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "vitamin-rich"],
    suitableFor: ["heart-healthy", "low-cholesterol"],
    dietaryTags: ["vegan", "gluten-free", "dairy-free"],
    cuisine: "indian",
    preparation: {
      difficulty: "intermediate",
      time: 25,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  
  // High-carb options (good for endurance athletes)
  {
    name: "Whole Grain Pasta with Marinara",
    timing: "dinner",
    calories: 550,
    protein: 20,
    carbs: 90,
    fats: 10,
    ingredients: [
      "2 cups whole grain pasta",
      "1 cup marinara sauce",
      "2 tbsp grated parmesan cheese",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tbsp dried basil"
    ],
    instructions: [
      "Cook pasta according to package directions",
      "Sauté garlic in olive oil",
      "Add marinara sauce and basil, heat through",
      "Toss with pasta",
      "Top with parmesan cheese"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-carb", "high-fiber"],
    suitableFor: [],
    dietaryTags: ["vegetarian"],
    cuisine: "italian",
    preparation: {
      difficulty: "beginner",
      time: 20,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  
  // Health-specific options (iron-rich, calcium-rich)
  {
    name: "Spinach and Red Meat Stir Fry",
    timing: "dinner",
    calories: 480,
    protein: 35,
    carbs: 25,
    fats: 25,
    ingredients: [
      "5 oz lean beef strips",
      "2 cups fresh spinach",
      "1 red bell pepper, sliced",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tbsp soy sauce",
      "1 tsp ginger, grated"
    ],
    instructions: [
      "Heat oil in a wok or large pan",
      "Add beef strips and cook until browned",
      "Add garlic and ginger, cook for 1 minute",
      "Add bell pepper and cook for 2 minutes",
      "Add spinach and cook until wilted",
      "Add soy sauce and toss to combine"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-iron"],
    suitableFor: ["iron-rich"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "asian",
    preparation: {
      difficulty: "intermediate",
      time: 20,
      mealPrepFriendly: false
    },
    budgetTier: "moderate"
  },
  {
    name: "Dairy-Rich Smoothie Bowl",
    timing: "breakfast",
    calories: 380,
    protein: 25,
    carbs: 40,
    fats: 12,
    ingredients: [
      "1 cup milk",
      "1/2 cup Greek yogurt",
      "1 banana",
      "1/4 cup blueberries",
      "1 tbsp chia seeds",
      "1 tbsp honey"
    ],
    instructions: [
      "Blend milk, yogurt, and banana until smooth",
      "Pour into a bowl",
      "Top with blueberries and chia seeds",
      "Drizzle with honey"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-calcium", "vitamin-rich"],
    suitableFor: ["calcium-rich"],
    dietaryTags: ["vegetarian", "gluten-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  },
  
  // Quick preparation meals
  {
    name: "5-Minute Tuna Wrap",
    timing: "lunch",
    calories: 350,
    protein: 30,
    carbs: 30,
    fats: 10,
    ingredients: [
      "1 can tuna, drained",
      "1 whole wheat wrap",
      "1 tbsp light mayonnaise",
      "1/4 cup shredded lettuce",
      "2 slices tomato"
    ],
    instructions: [
      "Mix tuna with mayonnaise",
      "Lay out wrap and add tuna mixture",
      "Top with lettuce and tomato",
      "Roll up and slice in half"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-fat"],
    suitableFor: ["heart-healthy"],
    dietaryTags: ["dairy-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  },
  
  // Premium ingredient meals
  {
    name: "Grilled Salmon with Asparagus",
    timing: "dinner",
    calories: 480,
    protein: 40,
    carbs: 15,
    fats: 28,
    ingredients: [
      "6 oz wild salmon fillet",
      "1 bunch asparagus",
      "1 tbsp olive oil",
      "1 lemon, sliced",
      "2 cloves garlic, minced",
      "1 tbsp fresh dill",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat grill to medium-high heat",
      "Brush salmon and asparagus with olive oil",
      "Season with salt, pepper, and garlic",
      "Grill salmon for 4-5 minutes per side",
      "Grill asparagus until tender",
      "Garnish with fresh dill and lemon slices"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-omega3", "low-carb"],
    suitableFor: ["heart-healthy", "anti-inflammatory"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "mediterranean",
    preparation: {
      difficulty: "intermediate",
      time: 20,
      mealPrepFriendly: false
    },
    budgetTier: "premium"
  },
  
  // Special dietary needs
  {
    name: "Gluten-Free Quinoa Bowl",
    timing: "lunch",
    calories: 420,
    protein: 15,
    carbs: 60,
    fats: 14,
    ingredients: [
      "1 cup cooked quinoa",
      "1/2 cup black beans",
      "1/4 cup corn",
      "1/4 avocado, diced",
      "2 tbsp cilantro, chopped",
      "1 tbsp lime juice",
      "1 tsp olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package directions",
      "Combine with black beans and corn",
      "Add diced avocado",
      "Drizzle with lime juice and olive oil",
      "Season with salt and pepper",
      "Garnish with cilantro"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "vitamin-rich"],
    suitableFor: ["diabetes-friendly"],
    dietaryTags: ["gluten-free", "vegan", "dairy-free", "nut-free"],
    cuisine: "mexican",
    preparation: {
      difficulty: "beginner",
      time: 15,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  
  // GERD-friendly option
  {
    name: "Mild Chicken and Rice Bowl",
    timing: "dinner",
    calories: 450,
    protein: 35,
    carbs: 50,
    fats: 10,
    ingredients: [
      "5 oz grilled chicken breast",
      "1 cup cooked white rice",
      "1/2 cup steamed carrots",
      "1/2 cup steamed green beans",
      "1 tbsp olive oil",
      "Salt to taste"
    ],
    instructions: [
      "Grill chicken until fully cooked",
      "Steam vegetables until tender",
      "Arrange rice, chicken, and vegetables in a bowl",
      "Drizzle with olive oil and season lightly with salt"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-fat"],
    suitableFor: ["gerd-friendly"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "international",
    preparation: {
      difficulty: "beginner",
      time: 20,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  }
];

// Create and save the meals
const createMeals = async () => {
  try {
    await connectDB();
    
    // Delete existing meals first (optional)
    const deleteResult = await Meal.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing meals`);
    
    // Create the new meals
    const result = await Meal.create(sampleMeals);
    console.log(`Created ${result.length} sample meals`);
    
    console.log('Sample meal creation complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating sample meals:', error);
    process.exit(1);
  }
};

// Run the script
createMeals(); 