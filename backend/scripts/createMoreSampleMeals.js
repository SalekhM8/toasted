/**
 * This script creates additional sample tagged meals for comprehensive testing of the Advanced Plan Tailoring feature
 * Run with: node backend/scripts/createMoreSampleMeals.js
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

// Additional breakfast options with varied tags
const breakfastMeals = [
  {
    name: "Protein-Packed Overnight Oats",
    timing: "breakfast",
    calories: 420,
    protein: 25,
    carbs: 50,
    fats: 12,
    ingredients: [
      "1 cup rolled oats",
      "1 cup almond milk",
      "1 scoop protein powder",
      "1 tbsp chia seeds",
      "1 tbsp peanut butter",
      "1/2 banana, sliced",
      "Cinnamon to taste"
    ],
    instructions: [
      "Mix oats, almond milk, protein powder, and chia seeds in a jar",
      "Add peanut butter and stir",
      "Top with banana slices and cinnamon",
      "Refrigerate overnight"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-fiber"],
    suitableFor: ["diabetes-friendly", "heart-healthy"],
    dietaryTags: ["vegetarian"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 10,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  {
    name: "Keto Breakfast Bowl",
    timing: "breakfast",
    calories: 550,
    protein: 30,
    carbs: 8,
    fats: 45,
    ingredients: [
      "2 eggs",
      "2 slices bacon",
      "1/2 avocado",
      "1/4 cup shredded cheese",
      "1 tbsp butter",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook bacon until crispy",
      "Scramble eggs in butter",
      "Combine in a bowl with sliced avocado",
      "Top with cheese, salt, and pepper"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-fat", "low-carb"],
    suitableFor: [],
    dietaryTags: ["gluten-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 15,
      mealPrepFriendly: false
    },
    budgetTier: "moderate"
  },
  {
    name: "Vitamin-Rich Breakfast Smoothie",
    timing: "breakfast",
    calories: 310,
    protein: 15,
    carbs: 45,
    fats: 10,
    ingredients: [
      "1 cup spinach",
      "1 banana",
      "1/2 cup frozen berries",
      "1 tbsp flaxseed",
      "1 cup unsweetened almond milk",
      "1 scoop protein powder"
    ],
    instructions: [
      "Add all ingredients to a blender",
      "Blend until smooth",
      "Pour into a glass and serve immediately"
    ],
    category: "home-cooked",
    nutritionalTags: ["vitamin-rich", "high-fiber"],
    suitableFor: ["heart-healthy", "vitamin-d-rich"],
    dietaryTags: ["vegan", "gluten-free", "dairy-free"],
    cuisine: "international",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  }
];

// Additional lunch options with varied tags
const lunchMeals = [
  {
    name: "Mediterranean Chickpea Salad",
    timing: "lunch",
    calories: 380,
    protein: 15,
    carbs: 45,
    fats: 16,
    ingredients: [
      "1 can chickpeas, drained",
      "1 cucumber, diced",
      "1 bell pepper, diced",
      "1/4 cup red onion, diced",
      "1/4 cup feta cheese",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "1 tsp dried oregano"
    ],
    instructions: [
      "Combine chickpeas, cucumber, bell pepper, and onion in a bowl",
      "Add feta cheese",
      "Mix olive oil, lemon juice, and oregano for dressing",
      "Toss with the salad"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "high-protein"],
    suitableFor: ["heart-healthy", "diabetes-friendly"],
    dietaryTags: ["vegetarian", "gluten-free"],
    cuisine: "mediterranean",
    preparation: {
      difficulty: "beginner",
      time: 15,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  {
    name: "Asian-Inspired Lettuce Wraps",
    timing: "lunch",
    calories: 320,
    protein: 25,
    carbs: 20,
    fats: 15,
    ingredients: [
      "1/2 lb ground turkey",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1/4 cup water chestnuts, diced",
      "2 tbsp soy sauce",
      "1 tbsp hoisin sauce",
      "8 lettuce leaves"
    ],
    instructions: [
      "Cook ground turkey in sesame oil until browned",
      "Add garlic and ginger, cook for 1 minute",
      "Add water chestnuts, soy sauce, and hoisin sauce",
      "Cook for 2-3 minutes",
      "Serve in lettuce leaves"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-carb"],
    suitableFor: ["diabetes-friendly"],
    dietaryTags: ["dairy-free"],
    cuisine: "asian",
    preparation: {
      difficulty: "intermediate",
      time: 20,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  },
  {
    name: "Iron-Rich Beef and Spinach Bowl",
    timing: "lunch",
    calories: 450,
    protein: 35,
    carbs: 30,
    fats: 20,
    ingredients: [
      "4 oz lean beef strips",
      "2 cups fresh spinach",
      "1/2 cup brown rice, cooked",
      "1 tbsp olive oil",
      "1 clove garlic, minced",
      "1 tbsp balsamic vinegar",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook brown rice according to package directions",
      "Sauté beef strips in olive oil until browned",
      "Add garlic and cook for 30 seconds",
      "Add spinach and cook until wilted",
      "Add balsamic vinegar and season with salt and pepper",
      "Serve over brown rice"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-iron"],
    suitableFor: ["iron-rich"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "international",
    preparation: {
      difficulty: "beginner",
      time: 25,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  }
];

// Additional dinner options with varied tags
const dinnerMeals = [
  {
    name: "GERD-Friendly Baked Chicken",
    timing: "dinner",
    calories: 380,
    protein: 35,
    carbs: 30,
    fats: 12,
    ingredients: [
      "6 oz boneless, skinless chicken breast",
      "1 cup brown rice, cooked",
      "1 cup steamed carrots",
      "1 tbsp olive oil",
      "1 tsp dried herbs (thyme, rosemary)",
      "Salt to taste"
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Brush chicken with olive oil and season with herbs and salt",
      "Bake for 25-30 minutes until fully cooked",
      "Serve with brown rice and steamed carrots"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "low-fat"],
    suitableFor: ["gerd-friendly", "heart-healthy"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 40,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  },
  {
    name: "Calcium-Rich Tofu Stir Fry",
    timing: "dinner",
    calories: 360,
    protein: 20,
    carbs: 40,
    fats: 15,
    ingredients: [
      "8 oz firm tofu, cubed",
      "2 cups mixed vegetables (broccoli, bok choy, carrots)",
      "1 cup brown rice, cooked",
      "2 tbsp sesame oil",
      "2 tbsp soy sauce",
      "1 tbsp rice vinegar",
      "1 tsp ginger, grated"
    ],
    instructions: [
      "Press tofu to remove excess water, then cube",
      "Heat sesame oil in a wok or large pan",
      "Add tofu and cook until golden",
      "Add vegetables and stir-fry until tender-crisp",
      "Add soy sauce, rice vinegar, and ginger",
      "Serve over brown rice"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-calcium", "vitamin-rich"],
    suitableFor: ["calcium-rich", "heart-healthy"],
    dietaryTags: ["vegetarian", "dairy-free"],
    cuisine: "asian",
    preparation: {
      difficulty: "intermediate",
      time: 30,
      mealPrepFriendly: true
    },
    budgetTier: "budget"
  },
  {
    name: "Premium Seafood Plate",
    timing: "dinner",
    calories: 520,
    protein: 45,
    carbs: 25,
    fats: 25,
    ingredients: [
      "6 oz wild-caught salmon",
      "6 large shrimp",
      "1 cup quinoa, cooked",
      "1 cup roasted vegetables",
      "2 tbsp olive oil",
      "1 lemon, sliced",
      "Fresh herbs (dill, parsley)",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Season salmon and shrimp with salt, pepper, and herbs",
      "Roast vegetables with olive oil",
      "Bake salmon for 12-15 minutes",
      "Sauté shrimp for 2-3 minutes per side",
      "Serve with quinoa and roasted vegetables"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein", "high-omega3"],
    suitableFor: ["heart-healthy", "anti-inflammatory"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "mediterranean",
    preparation: {
      difficulty: "advanced",
      time: 40,
      mealPrepFriendly: false
    },
    budgetTier: "premium"
  }
];

// Additional special diet meals
const specialDietMeals = [
  {
    name: "Anti-Inflammatory Berry Bowl",
    timing: "breakfast",
    calories: 320,
    protein: 10,
    carbs: 50,
    fats: 12,
    ingredients: [
      "1 cup mixed berries",
      "1/2 cup Greek yogurt",
      "1/4 cup granola",
      "1 tbsp honey",
      "1 tbsp chia seeds",
      "1 tbsp walnuts"
    ],
    instructions: [
      "Add Greek yogurt to a bowl",
      "Top with berries, granola, chia seeds, and walnuts",
      "Drizzle with honey"
    ],
    category: "home-cooked",
    nutritionalTags: ["antioxidant-rich", "high-fiber"],
    suitableFor: ["anti-inflammatory"],
    dietaryTags: ["vegetarian", "gluten-free"],
    cuisine: "american",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: false
    },
    budgetTier: "moderate"
  },
  {
    name: "Vegan Buddha Bowl",
    timing: "lunch",
    calories: 450,
    protein: 15,
    carbs: 65,
    fats: 18,
    ingredients: [
      "1 cup quinoa, cooked",
      "1 cup roasted sweet potatoes",
      "1 cup kale, massaged",
      "1/2 cup chickpeas",
      "1/4 avocado, sliced",
      "2 tbsp tahini dressing",
      "1 tbsp pumpkin seeds"
    ],
    instructions: [
      "Cook quinoa according to package directions",
      "Roast sweet potatoes with olive oil",
      "Massage kale with a bit of olive oil and salt",
      "Arrange all ingredients in a bowl",
      "Drizzle with tahini dressing and top with pumpkin seeds"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "vitamin-rich"],
    suitableFor: ["heart-healthy", "anti-inflammatory"],
    dietaryTags: ["vegan", "gluten-free", "dairy-free"],
    cuisine: "international",
    preparation: {
      difficulty: "intermediate",
      time: 35,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  },
  {
    name: "Low-FODMAP Chicken and Rice",
    timing: "dinner",
    calories: 420,
    protein: 30,
    carbs: 45,
    fats: 14,
    ingredients: [
      "5 oz grilled chicken breast",
      "1 cup rice, cooked",
      "1 cup carrots and bell peppers, roasted",
      "1 tbsp olive oil",
      "1 tsp dried herbs",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Grill chicken breast with olive oil and seasonings",
      "Cook rice according to package directions",
      "Roast carrots and bell peppers",
      "Combine all ingredients in a bowl"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-protein"],
    suitableFor: ["low-fodmap"],
    dietaryTags: ["gluten-free", "dairy-free"],
    cuisine: "international",
    preparation: {
      difficulty: "beginner",
      time: 30,
      mealPrepFriendly: true
    },
    budgetTier: "moderate"
  }
];

// Quick and simple meals
const quickMeals = [
  {
    name: "10-Minute Mexican Bowl",
    timing: "lunch",
    calories: 450,
    protein: 25,
    carbs: 50,
    fats: 16,
    ingredients: [
      "1 cup pre-cooked rice",
      "1/2 cup black beans, canned",
      "1/4 cup corn",
      "1/4 cup salsa",
      "1/4 avocado, diced",
      "2 tbsp Greek yogurt",
      "Cilantro for garnish"
    ],
    instructions: [
      "Heat rice in microwave",
      "Layer rice, beans, corn, salsa, and avocado in a bowl",
      "Top with Greek yogurt and cilantro"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "high-protein"],
    suitableFor: ["heart-healthy"],
    dietaryTags: ["vegetarian", "gluten-free"],
    cuisine: "mexican",
    preparation: {
      difficulty: "beginner",
      time: 10,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  },
  {
    name: "5-Minute Mediterranean Plate",
    timing: "lunch",
    calories: 380,
    protein: 15,
    carbs: 30,
    fats: 25,
    ingredients: [
      "1/2 cup hummus",
      "1 whole wheat pita",
      "1/2 cup cucumber, sliced",
      "1/2 cup cherry tomatoes",
      "5 kalamata olives",
      "1 oz feta cheese"
    ],
    instructions: [
      "Arrange all ingredients on a plate",
      "Serve with pita on the side"
    ],
    category: "home-cooked",
    nutritionalTags: ["high-fiber", "high-fat"],
    suitableFor: ["heart-healthy"],
    dietaryTags: ["vegetarian"],
    cuisine: "mediterranean",
    preparation: {
      difficulty: "beginner",
      time: 5,
      mealPrepFriendly: false
    },
    budgetTier: "budget"
  }
];

// Additional sample meals for more variety
const moreSampleMeals = [
  ...breakfastMeals,
  ...lunchMeals,
  ...dinnerMeals,
  ...specialDietMeals,
  ...quickMeals
];

// Create and save the meals
const createMoreMeals = async () => {
  try {
    await connectDB();
    
    // Create the new meals
    const result = await Meal.create(moreSampleMeals);
    console.log(`Created ${result.length} additional sample meals`);
    
    // Get total count of meals
    const totalCount = await Meal.countDocuments();
    console.log(`Total meals in database: ${totalCount}`);
    
    console.log('Additional sample meal creation complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating additional sample meals:', error);
    process.exit(1);
  }
};

// Run the script
createMoreMeals(); 