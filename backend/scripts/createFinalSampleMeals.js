/**
 * This script creates a final batch of sample tagged meals for comprehensive testing
 * Run with: node backend/scripts/createFinalSampleMeals.js
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

// Additional health condition specific meals
const healthConditionMeals = [
  {
    name: "Low-Sodium Herb-Roasted Chicken",
    timing: "dinner",
    calories: 350,
    protein: 40,
    carbs: 15,
    fats: 14,
    ingredients: [
      "6 oz chicken breast",
      "1 tbsp olive oil",
      "1 tbsp mixed herbs (thyme, rosemary, oregano)",
      "1 lemon, sliced",
      "Black pepper to taste",
      "2 cups mixed vegetables (no added salt)"
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Rub chicken with olive oil, herbs, and black pepper",
      "Place lemon slices on top",
      "Roast for 25-30 minutes until fully cooked",
      "Serve with steamed vegetables"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-sodium"],
    suitableFor: ["heart-healthy", "low-cholesterol"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "mediterranean",
    preparation: {
      difficulty: "beginner",
      time: 40,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  },
  {
    name: "Diabetic-Friendly Berry Parfait",
    timing: "breakfast",
    calories: 280,
    protein: 18,
    carbs: 30,
    fats: 10,
    ingredients: [
      "1 cup Greek yogurt (unsweetened)",
      "1/2 cup mixed berries",
      "1 tbsp ground flaxseed",
      "1 tbsp sliced almonds",
      "1 tsp cinnamon",
      "Stevia to taste (optional)"
    ],
    instructions: [
      "Layer Greek yogurt and berries in a bowl",
      "Top with flaxseed, almonds, and cinnamon",
      "Add stevia if desired"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-glycemic"],
    suitableFor: ["diabetes-friendly", "heart-healthy"],
    dietaryTags: ["vegetarian", "gluten-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  },
  {
    name: "Vitamin D and Calcium Boost Smoothie",
    timing: "breakfast",
    calories: 300,
    protein: 20,
    carbs: 35,
    fats: 10,
    ingredients: [
      "1 cup fortified milk",
      "1/2 cup Greek yogurt",
      "1 banana",
      "1 tbsp almond butter",
      "1 tsp chia seeds",
      "1/2 tsp cinnamon"
    ],
    instructions: [
      "Add all ingredients to a blender",
      "Blend until smooth",
      "Pour into a glass and serve"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-calcium", "vitamin-rich"],
    suitableFor: ["calcium-rich", "vitamin-d-rich"],
    dietaryTags: ["vegetarian", "gluten-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  }
];

// International cuisine options
const internationalCuisineMeals = [
  {
    name: "Thai Green Curry",
    timing: "dinner",
    calories: 420,
    protein: 25,
    carbs: 35,
    fats: 20,
    ingredients: [
      "4 oz chicken or tofu",
      "1 cup mixed vegetables (bell peppers, zucchini, eggplant)",
      "1/2 cup coconut milk",
      "2 tbsp green curry paste",
      "1 tbsp fish sauce (or soy sauce for vegetarian)",
      "1/2 cup rice",
      "Fresh basil leaves"
    ],
    instructions: [
      "Sauté chicken or tofu until cooked through",
      "Add vegetables and cook for 3-4 minutes",
      "Add curry paste and cook for 1 minute",
      "Pour in coconut milk and simmer for 5 minutes",
      "Add fish sauce or soy sauce",
      "Serve over rice, garnished with basil"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein"],
    suitableFor: [],
    dietaryTags: ["gluten-free"],
    cuisine: "thai",
    preparation: {
      difficulty: "intermediate",
      time: 30,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  },
  {
    name: "Spanish Chickpea and Spinach Stew",
    timing: "lunch",
    calories: 360,
    protein: 15,
    carbs: 45,
    fats: 14,
    ingredients: [
      "1 can chickpeas, drained",
      "2 cups fresh spinach",
      "1 small onion, diced",
      "2 cloves garlic, minced",
      "1 tsp paprika",
      "1/2 tsp cumin",
      "1 tbsp olive oil",
      "1/2 cup vegetable broth"
    ],
    instructions: [
      "Sauté onion and garlic in olive oil until soft",
      "Add paprika and cumin, cook for 30 seconds",
      "Add chickpeas and vegetable broth",
      "Simmer for 10 minutes",
      "Add spinach and cook until wilted",
      "Season with salt and pepper to taste"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "high-protein"],
    suitableFor: ["heart-healthy"],
    dietaryTags: ["vegan", "gluten-free", "dairy-free"],
    cuisine: "spanish",
    preparation: {
      difficulty: "beginner",
      time: 20,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  {
    name: "Japanese Miso Soup with Tofu",
    timing: "lunch",
    calories: 250,
    protein: 15,
    carbs: 20,
    fats: 10,
    ingredients: [
      "4 cups water",
      "3 tbsp miso paste",
      "8 oz soft tofu, cubed",
      "2 green onions, chopped",
      "1/4 cup dried seaweed (wakame)",
      "1 tbsp dried bonito flakes (optional)"
    ],
    instructions: [
      "Bring water to a gentle simmer",
      "Dissolve miso paste in a small amount of the hot water, then add to pot",
      "Add tofu and seaweed",
      "Simmer for 5 minutes",
      "Garnish with green onions and bonito flakes if using"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-fat"],
    suitableFor: ["heart-healthy"],
    dietaryTags: ["vegetarian", "gluten-free"],
    cuisine: "japanese",
    preparation: {
      difficulty: "beginner",
      time: 15,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  }
];

// Advanced dietary requirement meals
const advancedDietaryMeals = [
  {
    name: "Keto-Friendly Avocado Salad",
    timing: "lunch",
    calories: 450,
    protein: 25,
    carbs: 8,
    fats: 38,
    ingredients: [
      "1 large avocado, sliced",
      "4 oz grilled chicken",
      "2 cups mixed greens",
      "1/4 cup cherry tomatoes",
      "1/4 cup cucumber, sliced",
      "2 tbsp olive oil",
      "1 tbsp apple cider vinegar",
      "1 tsp Dijon mustard",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Arrange mixed greens on a plate",
      "Top with sliced avocado, chicken, tomatoes, and cucumber",
      "Whisk together olive oil, vinegar, and mustard for dressing",
      "Drizzle dressing over salad",
      "Season with salt and pepper"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fat", "low-carb", "high-protein"],
    suitableFor: [],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 15,
      mealPrepFriendly: false
    },
    budgetTier: "moderate"
  },
  {
    name: "Paleo Beef and Vegetable Stir-Fry",
    timing: "dinner",
    calories: 480,
    protein: 35,
    carbs: 20,
    fats: 28,
    ingredients: [
      "5 oz grass-fed beef strips",
      "2 cups mixed vegetables (broccoli, carrots, snap peas)",
      "1 tbsp coconut oil",
      "2 cloves garlic, minced",
      "1 tsp ginger, grated",
      "2 tbsp coconut aminos (soy sauce alternative)",
      "1 tsp arrowroot powder (thickener)"
    ],
    instructions: [
      "Heat coconut oil in a wok or large pan",
      "Sauté beef strips until browned",
      "Remove beef and set aside",
      "Add garlic and ginger to the pan, cook for 30 seconds",
      "Add vegetables and stir-fry until tender-crisp",
      "Return beef to the pan",
      "Mix coconut aminos with arrowroot powder and add to pan",
      "Cook until sauce thickens"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-fat"],
    suitableFor: [],
    dietaryTags: ["gluten-free", "dairy-free", "paleo-friendly"],
    cuisine: "asian",
    preparation: {
      difficulty: "intermediate",
      time: 25,
      mealPrepFriendly: true
    },
    budgetTier: "premium"
  },
  {
    name: "Allergen-Free Quinoa Bowl",
    timing: "lunch",
    calories: 400,
    protein: 12,
    carbs: 60,
    fats: 14,
    ingredients: [
      "1 cup cooked quinoa",
      "1 cup roasted vegetables (zucchini, carrots, sweet potatoes)",
      "1/4 cup chickpeas",
      "1 tbsp olive oil",
      "1 tbsp lemon juice",
      "Fresh herbs (parsley, mint)",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package directions",
      "Roast vegetables with olive oil",
      "Combine quinoa, roasted vegetables, and chickpeas in a bowl",
      "Drizzle with olive oil and lemon juice",
      "Season with salt, pepper, and fresh herbs"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "vitamin-rich"],
    suitableFor: ["heart-healthy"],
    dietaryTags: ["vegan", "gluten-free", "dairy-free", "nut-free", "egg-free", "soy-free"],
    cuisine: "mediterranean",
    preparation: {
      difficulty: "beginner",
      time: 30,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  }
];

// Premium ingredient meals for high-budget options
const premiumMeals = [
  {
    name: "Seared Scallops with Asparagus",
    timing: "dinner",
    calories: 350,
    protein: 30,
    carbs: 20,
    fats: 18,
    ingredients: [
      "6 large sea scallops",
      "1 bunch asparagus",
      "1 tbsp butter",
      "1 tbsp olive oil",
      "1 lemon, juiced",
      "2 cloves garlic, minced",
      "Fresh herbs (thyme, parsley)",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Pat scallops dry and season with salt and pepper",
      "Heat oil in a pan until very hot",
      "Sear scallops for 1-2 minutes per side until golden",
      "Remove scallops and set aside",
      "In the same pan, add butter and garlic",
      "Add asparagus and cook until tender",
      "Return scallops to pan, add lemon juice and herbs",
      "Serve immediately"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-carb"],
    suitableFor: ["heart-healthy"],
    dietaryTags: ["gluten-free"],
    cuisine: "french",
    preparation: {
      difficulty: "advanced",
      time: 20,
      mealPrepFriendly: false
    },
    budgetTier: "premium"
  },
  {
    name: "Grass-Fed Filet Mignon",
    timing: "dinner",
    calories: 500,
    protein: 40,
    carbs: 15,
    fats: 30,
    ingredients: [
      "6 oz grass-fed filet mignon",
      "1 tbsp butter",
      "2 cloves garlic",
      "Fresh rosemary and thyme",
      "1 cup roasted vegetables",
      "1/2 cup mashed cauliflower",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season steak with salt and pepper",
      "Heat a cast-iron skillet until very hot",
      "Cook steak to desired doneness (about 4 minutes per side for medium-rare)",
      "Add butter, garlic, and herbs during the last minute of cooking",
      "Let rest for 5 minutes before slicing",
      "Serve with roasted vegetables and mashed cauliflower"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-fat"],
    suitableFor: ["iron-rich"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "american",
    preparation: {
      difficulty: "intermediate",
      time: 25,
      mealPrepFriendly: false
    },
    budgetTier: "premium"
  }
];

// Final batch of sample meals for more variety
const finalSampleMeals = [
  ...healthConditionMeals,
  ...internationalCuisineMeals,
  ...advancedDietaryMeals,
  ...premiumMeals
];

// Create and save the meals
const createFinalMeals = async () => {
  try {
    await connectDB();
    
    // Create the new meals
    const result = await Meal.create(finalSampleMeals);
    console.log(`Created ${result.length} final sample meals`);
    
    // Get total count of meals
    const totalCount = await Meal.countDocuments();
    console.log(`Total meals in database: ${totalCount}`);
    
    console.log('Final sample meal creation complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating final sample meals:', error);
    process.exit(1);
  }
};

// Run the script
createFinalMeals(); 