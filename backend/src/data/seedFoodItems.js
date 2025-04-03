const FoodItem = require('../models/FoodItem');
const mongoose = require('mongoose');

// Helper function to create food items with common fields
const createFoodItem = (data) => {
  return {
    ...data,
    micronutrients: {
      vitamins: {
        a: data.micronutrients?.vitamins?.a || 0,
        c: data.micronutrients?.vitamins?.c || 0,
        d: data.micronutrients?.vitamins?.d || 0,
        e: data.micronutrients?.vitamins?.e || 0,
        b1: data.micronutrients?.vitamins?.b1 || 0,
        b2: data.micronutrients?.vitamins?.b2 || 0,
        b3: data.micronutrients?.vitamins?.b3 || 0,
        b6: data.micronutrients?.vitamins?.b6 || 0,
        b12: data.micronutrients?.vitamins?.b12 || 0,
        folate: data.micronutrients?.vitamins?.folate || 0
      },
      minerals: {
        calcium: data.micronutrients?.minerals?.calcium || 0,
        iron: data.micronutrients?.minerals?.iron || 0,
        magnesium: data.micronutrients?.minerals?.magnesium || 0,
        potassium: data.micronutrients?.minerals?.potassium || 0,
        zinc: data.micronutrients?.minerals?.zinc || 0,
        sodium: data.micronutrients?.minerals?.sodium || 0
      }
    }
  };
};

// Fruit items with more appropriate serving units
const fruitItems = [
  {
    name: 'Apple',
    category: 'fruits',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fats: 0.2,
    fiber: 2.4,
    sugar: 10.3,
    isGlutenFree: true,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        c: 4.6,
      },
      minerals: {
        potassium: 107
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'piece',
    searchTags: ['fruit', 'fresh', 'sweet']
  },
  {
    name: 'Banana',
    category: 'fruits',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fats: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    isGlutenFree: true,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        c: 8.7,
        b6: 0.4
      },
      minerals: {
        potassium: 358
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'piece',
    searchTags: ['fruit', 'fresh', 'sweet']
  },
  {
    name: 'Orange',
    category: 'fruits',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fats: 0.1,
    fiber: 2.4,
    sugar: 9.4,
    isGlutenFree: true,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        c: 53.2,
      },
      minerals: {
        potassium: 181
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'piece',
    searchTags: ['fruit', 'fresh', 'citrus']
  },
];

// Vegetable items with appropriate serving units
const vegetableItems = [
  {
    name: 'Broccoli',
    category: 'vegetables',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fats: 0.4,
    fiber: 2.6,
    isGlutenFree: true,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        c: 89.2,
        k: 102
      },
      minerals: {
        potassium: 316
      }
    },
    commonServingSize: 100,
    commonServingUnit: 'g',
    searchTags: ['vegetable', 'fresh', 'cruciferous']
  },
  {
    name: 'Spinach',
    category: 'vegetables',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    fiber: 2.2,
    isGlutenFree: true,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        a: 9377,
        c: 28.1,
        k: 483
      },
      minerals: {
        iron: 2.7,
        calcium: 99
      }
    },
    commonServingSize: 30,
    commonServingUnit: 'g',
    searchTags: ['vegetable', 'fresh', 'leafy green']
  },
  {
    name: 'Carrot',
    category: 'vegetables',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fats: 0.2,
    fiber: 2.8,
    isGlutenFree: true,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        a: 16706,
        c: 5.9
      },
      minerals: {
        potassium: 320
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'piece',
    searchTags: ['vegetable', 'fresh', 'root']
  },
];

// Protein items with appropriate serving units
const proteinItems = [
  {
    name: 'Chicken Breast',
    category: 'protein',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    isGlutenFree: true,
    isDairyFree: true,
    micronutrients: {
      vitamins: {
        b3: 13.4,
        b6: 0.6
      },
      minerals: {
        phosphorus: 196,
        potassium: 256
      }
    },
    commonServingSize: 150,
    commonServingUnit: 'g',
    searchTags: ['meat', 'poultry', 'lean']
  },
  {
    name: 'Salmon',
    category: 'protein',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 208,
    protein: 20,
    carbs: 0,
    fats: 13,
    saturatedFat: 3.1,
    isGlutenFree: true,
    isDairyFree: true,
    micronutrients: {
      vitamins: {
        d: 526,
        b12: 2.8
      },
      minerals: {
        selenium: 31.5
      }
    },
    commonServingSize: 125,
    commonServingUnit: 'g',
    searchTags: ['fish', 'seafood', 'omega3']
  },
  {
    name: 'Chicken Wings',
    category: 'protein',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 290,
    protein: 27,
    carbs: 0,
    fats: 19,
    isGlutenFree: true,
    isDairyFree: true,
    micronutrients: {
      vitamins: {
        b3: 8.6,
        b6: 0.5
      },
      minerals: {
        phosphorus: 178,
        potassium: 229
      }
    },
    commonServingSize: 6,
    commonServingUnit: 'piece',
    searchTags: ['meat', 'poultry', 'appetizer']
  },
  {
    name: 'Lamb Chops',
    category: 'protein',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 294,
    protein: 25,
    carbs: 0,
    fats: 21,
    isGlutenFree: true,
    isDairyFree: true,
    micronutrients: {
      vitamins: {
        b12: 2.3,
        b3: 6.1
      },
      minerals: {
        iron: 1.9,
        zinc: 4.3
      }
    },
    commonServingSize: 180,
    commonServingUnit: 'g',
    searchTags: ['meat', 'lamb', 'red meat']
  },
];

// Dairy items with appropriate serving units
const dairyItems = [
  {
    name: 'Milk',
    category: 'dairy',
    baseQuantity: 100,
    baseUnit: 'ml',
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fats: 3.3,
    sugar: 5.1,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        a: 68,
        d: 40
      },
      minerals: {
        calcium: 125,
        potassium: 150
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'cup',
    searchTags: ['dairy', 'beverage']
  },
  {
    name: 'Greek Yogurt',
    category: 'dairy',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 97,
    protein: 9,
    carbs: 3.6,
    fats: 5,
    isVegetarian: true,
    micronutrients: {
      minerals: {
        calcium: 110,
        potassium: 141
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'cup',
    searchTags: ['dairy', 'breakfast', 'protein']
  },
];

// Beverage items with appropriate serving units
const beverageItems = [
  {
    name: 'Vanilla Milkshake',
    category: 'beverages',
    baseQuantity: 100,
    baseUnit: 'ml',
    calories: 112,
    protein: 3.8,
    carbs: 17.2,
    fats: 3.6,
    sugar: 15.8,
    isVegetarian: true,
    micronutrients: {
      minerals: {
        calcium: 120
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'cup',
    searchTags: ['dessert', 'sweet', 'dairy', 'shake']
  },
  {
    name: 'Orange Juice',
    category: 'beverages',
    baseQuantity: 100,
    baseUnit: 'ml',
    calories: 45,
    protein: 0.7,
    carbs: 10.4,
    fats: 0.2,
    sugar: 8.3,
    isGlutenFree: true,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      vitamins: {
        c: 50
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'cup',
    searchTags: ['fruit', 'juice', 'breakfast']
  },
];

// Snack items with appropriate serving units
const snackItems = [
  {
    name: 'Chocolate Chip Cookie',
    category: 'snacks',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 488,
    protein: 5.2,
    carbs: 64,
    fats: 24,
    sugar: 35,
    micronutrients: {
      minerals: {
        sodium: 380
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'piece',
    searchTags: ['dessert', 'sweet', 'baked']
  },
  {
    name: 'Potato Chips',
    category: 'snacks',
    baseQuantity: 100,
    baseUnit: 'g',
    calories: 536,
    protein: 7,
    carbs: 53,
    fats: 35,
    isVegan: true,
    isVegetarian: true,
    micronutrients: {
      minerals: {
        sodium: 210
      }
    },
    commonServingSize: 1,
    commonServingUnit: 'serving',
    searchTags: ['salty', 'crunchy', 'packaged']
  },
];

// This seed file now has more appropriate serving units and a wider variety of food items
const initialFoodItems = [
  ...fruitItems.map(item => createFoodItem(item)),
  ...vegetableItems.map(item => createFoodItem(item)),
  ...proteinItems.map(item => createFoodItem(item)),
  ...dairyItems.map(item => createFoodItem(item)),
  ...beverageItems.map(item => createFoodItem(item)),
  ...snackItems.map(item => createFoodItem(item)),
];

// Function to seed the database with food items
async function seedFoodItems() {
  try {
    // Check if food items already exist
    const count = await FoodItem.countDocuments();
    if (count > 0) {
      console.log(`${count} food items already exist in database. Skipping seed.`);
      return;
    }

    // For demonstration purposes, we're only inserting a sample set of items
    await FoodItem.insertMany(initialFoodItems);
    console.log(`Successfully seeded ${initialFoodItems.length} food items`);
    
    console.log('Note: This is a small sample set. A production database would have 1000+ items.');
  } catch (error) {
    console.error('Error seeding food items:', error);
  }
}

module.exports = { seedFoodItems };

// If this file is run directly
if (require.main === module) {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/toasted')
    .then(() => {
      console.log('MongoDB connected');
      return seedFoodItems();
    })
    .then(() => {
      console.log('Seed completed');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
} 