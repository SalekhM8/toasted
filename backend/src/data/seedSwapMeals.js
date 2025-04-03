const { Meal } = require('../models/Plan');

// Additional meals for swap options including restaurant and fast-food choices
const swapMeals = [
  // Restaurant options
  {
    name: "Restaurant Greek Salad",
    timing: "Lunch",
    calories: 380,
    protein: 15,
    carbs: 20,
    fats: 25,
    micronutrients: {
      vitamins: {
        a: 4500, c: 45, d: 0, e: 4,
        b1: 0.2, b2: 0.3, b3: 1.5, b6: 0.6, b12: 0.7, folate: 120
      },
      minerals: {
        calcium: 200, iron: 2.5, magnesium: 40, potassium: 450, zinc: 1.5, sodium: 850
      }
    },
    ingredients: [
      "Mixed greens", "Cucumber", "Tomato", "Red onion", 
      "Feta cheese", "Kalamata olives", "Olive oil", "Red wine vinegar"
    ],
    instructions: ["Order from restaurant"],
    notes: "A classic Mediterranean option that's relatively healthy when dining out.",
    category: "restaurant"
  },
  {
    name: "Restaurant Grilled Chicken Sandwich",
    timing: "Lunch",
    calories: 550,
    protein: 35,
    carbs: 50,
    fats: 20,
    micronutrients: {
      vitamins: {
        a: 200, c: 5, d: 0, e: 1,
        b1: 0.3, b2: 0.2, b3: 8, b6: 0.5, b12: 0.3, folate: 40
      },
      minerals: {
        calcium: 80, iron: 2, magnesium: 30, potassium: 300, zinc: 1.2, sodium: 950
      }
    },
    ingredients: [
      "Grilled chicken breast", "Whole wheat bun", "Lettuce", "Tomato", 
      "Onion", "Low-fat mayo", "Mustard"
    ],
    instructions: ["Order from restaurant"],
    notes: "Ask for sauce on the side to control fat content.",
    category: "restaurant"
  },
  {
    name: "Restaurant Steak & Vegetables",
    timing: "Dinner",
    calories: 650,
    protein: 45,
    carbs: 35,
    fats: 35,
    micronutrients: {
      vitamins: {
        a: 3500, c: 30, d: 0, e: 2,
        b1: 0.2, b2: 0.3, b3: 10, b6: 0.8, b12: 2.5, folate: 80
      },
      minerals: {
        calcium: 60, iron: 5, magnesium: 80, potassium: 800, zinc: 5, sodium: 900
      }
    },
    ingredients: [
      "Lean steak (8oz)", "Steamed broccoli", "Carrots", "Small potato",
      "Olive oil", "Salt & pepper", "Herbs"
    ],
    instructions: ["Order medium to avoid extra fat", "Request minimal oil for vegetables"],
    notes: "Ask for vegetables to be steamed with minimal butter/oil.",
    category: "restaurant"
  },
  {
    name: "Restaurant Salmon & Rice Bowl",
    timing: "Dinner",
    calories: 690,
    protein: 40,
    carbs: 65,
    fats: 25,
    micronutrients: {
      vitamins: {
        a: 800, c: 20, d: 500, e: 4,
        b1: 0.3, b2: 0.4, b3: 12, b6: 1, b12: 5, folate: 90
      },
      minerals: {
        calcium: 80, iron: 2, magnesium: 120, potassium: 900, zinc: 2, sodium: 850
      }
    },
    ingredients: [
      "Grilled salmon", "Brown rice", "Mixed vegetables", "Avocado",
      "Soy sauce", "Ginger", "Lemon"
    ],
    instructions: ["Order with sauce on the side"],
    notes: "Rich in omega-3 fatty acids. Great post-workout option.",
    category: "restaurant"
  },
  // Fast food options
  {
    name: "Fast Food Grilled Chicken Salad",
    timing: "Lunch",
    calories: 320,
    protein: 30,
    carbs: 15,
    fats: 15,
    micronutrients: {
      vitamins: {
        a: 4000, c: 35, d: 0, e: 2,
        b1: 0.1, b2: 0.2, b3: 5, b6: 0.4, b12: 0.5, folate: 70
      },
      minerals: {
        calcium: 120, iron: 1.5, magnesium: 30, potassium: 400, zinc: 1, sodium: 950
      }
    },
    ingredients: [
      "Grilled chicken breast", "Mixed greens", "Cherry tomatoes", 
      "Cucumber", "Low-fat dressing"
    ],
    instructions: ["Order from fast food chain", "Ask for dressing on the side"],
    notes: "A healthier fast food option. Choose vinaigrette over creamy dressing.",
    category: "fast-food"
  },
  {
    name: "Fast Food Protein Style Burger",
    timing: "Lunch",
    calories: 400,
    protein: 35,
    carbs: 10,
    fats: 25,
    micronutrients: {
      vitamins: {
        a: 300, c: 3, d: 0, e: 1,
        b1: 0.2, b2: 0.3, b3: 6, b6: 0.3, b12: 2, folate: 30
      },
      minerals: {
        calcium: 100, iron: 3, magnesium: 25, potassium: 300, zinc: 3, sodium: 1200
      }
    },
    ingredients: [
      "Beef patty", "Lettuce wrap (no bun)", "Tomato", "Onion", 
      "Pickles", "Mustard"
    ],
    instructions: ["Order protein-style or lettuce-wrapped", "Skip the sauce"],
    notes: "Low-carb fast food option. Skip cheese to reduce fat and sodium.",
    category: "fast-food"
  },
  {
    name: "Fast Food Grilled Chicken Wrap",
    timing: "Lunch",
    calories: 450,
    protein: 30,
    carbs: 45,
    fats: 15,
    micronutrients: {
      vitamins: {
        a: 600, c: 15, d: 0, e: 1,
        b1: 0.3, b2: 0.2, b3: 8, b6: 0.4, b12: 0.3, folate: 60
      },
      minerals: {
        calcium: 80, iron: 2, magnesium: 30, potassium: 300, zinc: 1, sodium: 900
      }
    },
    ingredients: [
      "Grilled chicken", "Whole wheat wrap", "Lettuce", "Tomato",
      "Light dressing"
    ],
    instructions: ["Order from fast food chain", "Ask for sauce on the side"],
    notes: "Choose grilled over crispy chicken to reduce calories and fat.",
    category: "fast-food"
  },
  {
    name: "Pizza (2 Thin Crust Slices)",
    timing: "Dinner",
    calories: 500,
    protein: 20,
    carbs: 50,
    fats: 25,
    micronutrients: {
      vitamins: {
        a: 800, c: 10, d: 0, e: 2,
        b1: 0.3, b2: 0.3, b3: 4, b6: 0.2, b12: 0.8, folate: 60
      },
      minerals: {
        calcium: 350, iron: 3, magnesium: 40, potassium: 300, zinc: 2, sodium: 1100
      }
    },
    ingredients: [
      "Thin crust", "Tomato sauce", "Light cheese", "Vegetables", 
      "Lean protein topping"
    ],
    instructions: ["Limit to 2 slices", "Choose thin crust", "Add vegetables"],
    notes: "Choose vegetable toppings over processed meats. Blot excess oil.",
    category: "takeout"
  },
  // Home-cooked alternatives
  {
    name: "Quick Protein Oats",
    timing: "Breakfast",
    calories: 350,
    protein: 25,
    carbs: 40,
    fats: 10,
    micronutrients: {
      vitamins: {
        a: 200, c: 5, d: 50, e: 2,
        b1: 0.5, b2: 0.4, b3: 2, b6: 0.3, b12: 1.5, folate: 80
      },
      minerals: {
        calcium: 300, iron: 4, magnesium: 120, potassium: 350, zinc: 3, sodium: 150
      }
    },
    ingredients: [
      "Rolled oats (1/2 cup)", "Protein powder (1 scoop)", "Milk (1 cup)",
      "Banana (1/2)", "Cinnamon", "Honey (1 tsp)"
    ],
    instructions: [
      "Mix oats and milk", 
      "Microwave for 90 seconds", 
      "Stir in protein powder", 
      "Top with banana and cinnamon"
    ],
    notes: "Quick 5-minute breakfast with balanced macros. Great pre-workout.",
    category: "home-cooked"
  },
  {
    name: "Tuna & Avocado Wrap",
    timing: "Lunch",
    calories: 450,
    protein: 30,
    carbs: 35,
    fats: 20,
    micronutrients: {
      vitamins: {
        a: 300, c: 15, d: 80, e: 5,
        b1: 0.1, b2: 0.2, b3: 10, b6: 0.5, b12: 2.5, folate: 60
      },
      minerals: {
        calcium: 60, iron: 2, magnesium: 60, potassium: 700, zinc: 1.5, sodium: 400
      }
    },
    ingredients: [
      "Canned tuna (1 can)", "Avocado (1/2)", "Whole wheat wrap (1)", 
      "Mixed greens", "Cherry tomatoes", "Lemon juice", "Black pepper"
    ],
    instructions: [
      "Drain tuna", 
      "Mash with avocado", 
      "Add lemon and seasoning", 
      "Spread on wrap with vegetables", 
      "Roll up and enjoy"
    ],
    notes: "High in omega-3 fatty acids. No cooking required. Great on-the-go option.",
    category: "home-cooked"
  },
  {
    name: "3-Ingredient Protein Pancakes",
    timing: "Breakfast",
    calories: 300,
    protein: 30,
    carbs: 25,
    fats: 10,
    micronutrients: {
      vitamins: {
        a: 300, c: 0, d: 40, e: 1,
        b1: 0.1, b2: 0.4, b3: 2, b6: 0.3, b12: 1, folate: 40
      },
      minerals: {
        calcium: 150, iron: 1.5, magnesium: 40, potassium: 300, zinc: 1.2, sodium: 250
      }
    },
    ingredients: [
      "Banana (1 ripe)", "Eggs (2)", "Protein powder (1 scoop)",
      "Cinnamon (optional)", "Berries for topping (optional)"
    ],
    instructions: [
      "Mash banana", 
      "Whisk with eggs and protein powder", 
      "Cook like pancakes on medium heat", 
      "Flip when bubbles form"
    ],
    notes: "Super quick and simple. Great for beginners. Add cinnamon for flavor.",
    category: "home-cooked"
  },
  {
    name: "Microwave Sweet Potato & Tuna",
    timing: "Lunch",
    calories: 400,
    protein: 35,
    carbs: 45,
    fats: 8,
    micronutrients: {
      vitamins: {
        a: 18000, c: 35, d: 40, e: 2,
        b1: 0.2, b2: 0.1, b3: 8, b6: 0.8, b12: 2, folate: 40
      },
      minerals: {
        calcium: 80, iron: 2.5, magnesium: 60, potassium: 900, zinc: 1.5, sodium: 300
      }
    },
    ingredients: [
      "Sweet potato (1 medium)", "Canned tuna (1 can)", "Greek yogurt (2 tbsp)",
      "Chives", "Salt & pepper", "Lemon juice"
    ],
    instructions: [
      "Pierce potato and microwave 5-6 minutes", 
      "Mix tuna with yogurt and seasonings", 
      "Split potato and top with tuna mixture"
    ],
    notes: "Great post-workout meal. High in vitamin A and potassium.",
    category: "home-cooked"
  },
  // Additional popular takeout and fast food options
  {
    name: "Classic Cheeseburger & Fries",
    timing: "Lunch",
    calories: 850,
    protein: 35,
    carbs: 80,
    fats: 45,
    micronutrients: {
      vitamins: {
        a: 200, c: 5, d: 0, e: 1,
        b1: 0.3, b2: 0.4, b3: 8, b6: 0.3, b12: 2.5, folate: 40
      },
      minerals: {
        calcium: 200, iron: 4.5, magnesium: 50, potassium: 800, zinc: 5, sodium: 1500
      }
    },
    ingredients: [
      "Beef patty", "Cheese slice", "Burger bun", "Lettuce", "Tomato", 
      "Onion", "Pickles", "Mayo", "Ketchup", "French fries"
    ],
    instructions: ["Order from fast food restaurant"],
    notes: "A classic fast food option that can fit into your diet occasionally.",
    category: "fast-food"
  },
  {
    name: "Double Cheeseburger Meal",
    timing: "Lunch",
    calories: 1100,
    protein: 50,
    carbs: 90,
    fats: 60,
    micronutrients: {
      vitamins: {
        a: 300, c: 6, d: 0, e: 1.5,
        b1: 0.4, b2: 0.5, b3: 10, b6: 0.4, b12: 4, folate: 50
      },
      minerals: {
        calcium: 300, iron: 7, magnesium: 60, potassium: 900, zinc: 8, sodium: 1800
      }
    },
    ingredients: [
      "2 Beef patties", "2 Cheese slices", "Burger bun", "Lettuce", "Tomato", 
      "Onion", "Pickles", "Special sauce", "French fries", "Soda"
    ],
    instructions: ["Order from fast food restaurant"],
    notes: "Higher in calories and protein. Good option after intense workouts or for heavy lifting days.",
    category: "fast-food"
  },
  {
    name: "Crispy Chicken Sandwich Meal",
    timing: "Lunch",
    calories: 900,
    protein: 40,
    carbs: 85,
    fats: 45,
    micronutrients: {
      vitamins: {
        a: 150, c: 4, d: 0, e: 1,
        b1: 0.3, b2: 0.3, b3: 9, b6: 0.4, b12: 0.5, folate: 45
      },
      minerals: {
        calcium: 100, iron: 3, magnesium: 40, potassium: 600, zinc: 2, sodium: 1600
      }
    },
    ingredients: [
      "Breaded chicken breast", "Brioche bun", "Mayo", "Pickles", 
      "Lettuce", "French fries", "Soda"
    ],
    instructions: ["Order from fast food restaurant"],
    notes: "Popular alternative to beef burgers. Try grilled version for lower calories.",
    category: "fast-food"
  },
  {
    name: "Personal Pepperoni Pizza",
    timing: "Dinner",
    calories: 700,
    protein: 30,
    carbs: 80,
    fats: 30,
    micronutrients: {
      vitamins: {
        a: 600, c: 8, d: 0, e: 2,
        b1: 0.4, b2: 0.4, b3: 5, b6: 0.3, b12: 1, folate: 80
      },
      minerals: {
        calcium: 400, iron: 4, magnesium: 60, potassium: 400, zinc: 3, sodium: 1700
      }
    },
    ingredients: [
      "Pizza dough", "Tomato sauce", "Mozzarella cheese", "Pepperoni slices"
    ],
    instructions: ["Order from pizza restaurant"],
    notes: "Individual sized pizza. Limit to one personal pizza.",
    category: "takeout"
  },
  {
    name: "Vegetable Pizza (2 slices)",
    timing: "Lunch",
    calories: 450,
    protein: 18,
    carbs: 60,
    fats: 15,
    micronutrients: {
      vitamins: {
        a: 1500, c: 20, d: 0, e: 3,
        b1: 0.3, b2: 0.3, b3: 4, b6: 0.4, b12: 0.5, folate: 80
      },
      minerals: {
        calcium: 300, iron: 3, magnesium: 50, potassium: 400, zinc: 2, sodium: 900
      }
    },
    ingredients: [
      "Pizza dough", "Tomato sauce", "Light cheese", "Bell peppers", 
      "Mushrooms", "Onions", "Olives", "Spinach"
    ],
    instructions: ["Order veggie pizza", "Limit to 2 slices"],
    notes: "Healthier pizza option with lower calories and fat than meat versions.",
    category: "takeout"
  },
  {
    name: "Margherita Pizza (2 slices)",
    timing: "Dinner",
    calories: 500,
    protein: 20,
    carbs: 65,
    fats: 20,
    micronutrients: {
      vitamins: {
        a: 800, c: 10, d: 0, e: 2,
        b1: 0.3, b2: 0.4, b3: 4, b6: 0.2, b12: 1, folate: 60
      },
      minerals: {
        calcium: 400, iron: 3, magnesium: 40, potassium: 300, zinc: 2, sodium: 1000
      }
    },
    ingredients: [
      "Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil leaves",
      "Olive oil"
    ],
    instructions: ["Order margherita pizza", "Limit to 2 slices"],
    notes: "Classic simple pizza with balanced macros.",
    category: "takeout"
  },
  {
    name: "Chicken Teriyaki Bowl",
    timing: "Dinner",
    calories: 650,
    protein: 40,
    carbs: 80,
    fats: 15,
    micronutrients: {
      vitamins: {
        a: 300, c: 15, d: 0, e: 1,
        b1: 0.2, b2: 0.3, b3: 15, b6: 0.8, b12: 0.5, folate: 40
      },
      minerals: {
        calcium: 60, iron: 3, magnesium: 80, potassium: 600, zinc: 3, sodium: 1200
      }
    },
    ingredients: [
      "Grilled chicken", "Steamed rice", "Teriyaki sauce", "Steamed vegetables"
    ],
    instructions: ["Order from Japanese restaurant"],
    notes: "Good balance of protein and carbs. Ask for sauce on the side to control portions.",
    category: "takeout"
  },
  {
    name: "Beef & Broccoli with Rice",
    timing: "Dinner",
    calories: 700,
    protein: 35,
    carbs: 75,
    fats: 25,
    micronutrients: {
      vitamins: {
        a: 1200, c: 70, d: 0, e: 2,
        b1: 0.2, b2: 0.3, b3: 10, b6: 0.5, b12: 2, folate: 80
      },
      minerals: {
        calcium: 100, iron: 4, magnesium: 70, potassium: 700, zinc: 4, sodium: 1400
      }
    },
    ingredients: [
      "Beef slices", "Broccoli", "Rice", "Soy sauce", "Garlic", "Ginger"
    ],
    instructions: ["Order from Chinese restaurant"],
    notes: "Good option with vegetables. Request less oil if possible.",
    category: "takeout"
  },
  {
    name: "Chicken Burrito Bowl",
    timing: "Lunch",
    calories: 700,
    protein: 40,
    carbs: 80,
    fats: 20,
    micronutrients: {
      vitamins: {
        a: 500, c: 25, d: 0, e: 2,
        b1: 0.3, b2: 0.2, b3: 8, b6: 0.6, b12: 0.5, folate: 100
      },
      minerals: {
        calcium: 150, iron: 4, magnesium: 80, potassium: 800, zinc: 4, sodium: 1100
      }
    },
    ingredients: [
      "Grilled chicken", "Brown rice", "Black beans", "Lettuce",
      "Tomato salsa", "Corn", "Guacamole"
    ],
    instructions: ["Order without the tortilla", "Ask for salad bowl option"],
    notes: "High in protein and fiber. Skip the sour cream and cheese to reduce calories.",
    category: "takeout"
  },
  {
    name: "Fish & Chips",
    timing: "Dinner",
    calories: 900,
    protein: 35,
    carbs: 90,
    fats: 45,
    micronutrients: {
      vitamins: {
        a: 150, c: 10, d: 3, e: 2,
        b1: 0.3, b2: 0.2, b3: 6, b6: 0.4, b12: 3, folate: 40
      },
      minerals: {
        calcium: 80, iron: 3, magnesium: 60, potassium: 900, zinc: 2, sodium: 1200
      }
    },
    ingredients: [
      "Battered fish fillet", "French fries", "Tartar sauce", "Lemon"
    ],
    instructions: ["Order from seafood restaurant"],
    notes: "High in carbs and fat. Share the fries portion to reduce calories.",
    category: "restaurant"
  },
  {
    name: "Chicken Caesar Salad",
    timing: "Lunch",
    calories: 450,
    protein: 30,
    carbs: 15,
    fats: 30,
    micronutrients: {
      vitamins: {
        a: 3000, c: 20, d: 0, e: 3,
        b1: 0.2, b2: 0.3, b3: 8, b6: 0.5, b12: 0.5, folate: 100
      },
      minerals: {
        calcium: 200, iron: 2, magnesium: 40, potassium: 500, zinc: 1.5, sodium: 900
      }
    },
    ingredients: [
      "Grilled chicken breast", "Romaine lettuce", "Caesar dressing",
      "Parmesan cheese", "Croutons"
    ],
    instructions: ["Order dressing on the side", "Use half the dressing"],
    notes: "Lower carb option. Request light on croutons to reduce carbs further.",
    category: "restaurant"
  },
  {
    name: "Fried Chicken Meal",
    timing: "Dinner",
    calories: 800,
    protein: 45,
    carbs: 60,
    fats: 40,
    micronutrients: {
      vitamins: {
        a: 200, c: 5, d: 0, e: 1,
        b1: 0.3, b2: 0.3, b3: 10, b6: 0.6, b12: 0.5, folate: 30
      },
      minerals: {
        calcium: 60, iron: 4, magnesium: 50, potassium: 600, zinc: 3, sodium: 1500
      }
    },
    ingredients: [
      "Fried chicken pieces", "Mashed potatoes", "Gravy", "Biscuit", "Coleslaw"
    ],
    instructions: ["Order from chicken restaurant"],
    notes: "High in protein but also high in fat. Remove skin to reduce fat content.",
    category: "fast-food"
  },
  {
    name: "Falafel Pita Sandwich",
    timing: "Lunch",
    calories: 550,
    protein: 20,
    carbs: 70,
    fats: 20,
    micronutrients: {
      vitamins: {
        a: 600, c: 15, d: 0, e: 3,
        b1: 0.3, b2: 0.2, b3: 3, b6: 0.4, b12: 0, folate: 120
      },
      minerals: {
        calcium: 150, iron: 4, magnesium: 80, potassium: 600, zinc: 2, sodium: 800
      }
    },
    ingredients: [
      "Falafel balls", "Pita bread", "Hummus", "Lettuce", "Tomato",
      "Cucumber", "Tahini sauce"
    ],
    instructions: ["Order from Mediterranean restaurant"],
    notes: "Vegetarian option high in plant protein. Ask for sauce on the side.",
    category: "takeout"
  },
  {
    name: "Sushi Roll Combo (12 pieces)",
    timing: "Dinner",
    calories: 600,
    protein: 25,
    carbs: 80,
    fats: 15,
    micronutrients: {
      vitamins: {
        a: 300, c: 10, d: 5, e: 2,
        b1: 0.2, b2: 0.3, b3: 10, b6: 0.5, b12: 2, folate: 60
      },
      minerals: {
        calcium: 80, iron: 2, magnesium: 60, potassium: 400, zinc: 2, sodium: 1000
      }
    },
    ingredients: [
      "Sushi rice", "Nori (seaweed)", "Various fish (tuna, salmon)", 
      "Avocado", "Cucumber", "Soy sauce", "Wasabi", "Ginger"
    ],
    instructions: ["Order from Japanese restaurant", "Limit soy sauce use"],
    notes: "Good balance of macros. Choose rolls with more fish and less rice for higher protein.",
    category: "restaurant"
  }
];

// Function to seed the meals collection with swap options
const seedSwapMeals = async () => {
  try {
    // Check if there are already swap meals in the database
    const existingMeals = await Meal.countDocuments();
    console.log(`Found ${existingMeals} existing meals in database`);
    
    // Instead of skipping all meals, we'll check each one individually
    let newMealsAdded = 0;
    
    // For each meal in our swapMeals array
    for (const meal of swapMeals) {
      // Check if this meal already exists (by name)
      const existingMeal = await Meal.findOne({ name: meal.name });
      
      // If it doesn't exist, insert it
      if (!existingMeal) {
        await Meal.create(meal);
        console.log(`Added new meal: ${meal.name}`);
        newMealsAdded++;
      }
    }
    
    if (newMealsAdded > 0) {
      console.log(`Successfully added ${newMealsAdded} new meals to the database`);
    } else {
      console.log('No new meals were added (all already exist)');
    }
  } catch (error) {
    console.error('Error seeding swap meals:', error);
  }
};

// Function to run the seed script
async function runSeedDataScript() {
  try {
    // Connect to MongoDB (this should be handled by server.js, so we'll just check for existing data)
    const existingMeals = await Meal.find({}).lean();
    console.log(`Found ${existingMeals.length} existing meals in database`);
    
    // Check if our swap meals already exist
    const swapMealNames = swapMeals.map(meal => meal.name);
    const existingSwapMealNames = existingMeals
      .filter(meal => swapMealNames.includes(meal.name))
      .map(meal => meal.name);
    
    if (existingSwapMealNames.length === swapMealNames.length) {
      console.log('No new meals were added (all already exist)');
      return;
    }
    
    // Filter out meals that already exist
    const newMeals = swapMeals.filter(meal => !existingSwapMealNames.includes(meal.name));
    
    // Insert the new meals
    if (newMeals.length > 0) {
      await Meal.insertMany(newMeals);
      console.log(`Successfully added ${newMeals.length} new swap meals`);
    }
  } catch (error) {
    console.error('Error seeding swap meals:', error);
  }
}

// Export the function
module.exports = { runSeedDataScript, swapMeals }; 