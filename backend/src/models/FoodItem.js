const mongoose = require('mongoose');

// Import the micronutrients schema from the Plan model
const { micronutrientsSchema } = require('./Plan');

// Schema for food items in the database
const foodItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    index: true 
  },
  category: { 
    type: String, 
    enum: [
      'fruits', 
      'vegetables', 
      'grains', 
      'protein', 
      'dairy', 
      'snacks', 
      'beverages', 
      'condiments',
      'baked-goods',
      'packaged-foods',
      'fast-food',
      'restaurant',
      'desserts',
      'supplements',
      'nuts-seeds',
      'oils-fats',
      'other'
    ],
    required: true,
    index: true
  },
  // Nutritional data per 100g/100ml by default
  baseQuantity: { 
    type: Number, 
    default: 100, 
    required: true 
  },
  baseUnit: { 
    type: String, 
    enum: ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving'],
    default: 'g',
    required: true 
  },
  // Core macronutrients
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  
  // Detailed macronutrient breakdown
  fiber: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  saturatedFat: { type: Number, default: 0 },
  unsaturatedFat: { type: Number, default: 0 },
  transFat: { type: Number, default: 0 },
  cholesterol: { type: Number, default: 0 },
  
  // Micronutrients using the same structure as meals
  micronutrients: { 
    type: micronutrientsSchema, 
    default: () => ({}) 
  },
  
  // Common serving information
  commonServingSize: { type: Number },  // e.g., 30g for cereal
  commonServingUnit: { 
    type: String,
    enum: ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving']
  },
  
  // Additional metadata
  brand: { type: String, index: true },
  description: String,
  isPackaged: { type: Boolean, default: false },
  barcode: { type: String, sparse: true, index: true },
  
  // Search optimization
  alternateNames: [String],  // For better search results
  searchTags: [String],      // Keywords for improved searching
  popularity: { type: Number, default: 0 },  // For sorting results
  
  // Flags
  isGlutenFree: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  isVegetarian: { type: Boolean, default: false },
  isKeto: { type: Boolean, default: false },
  isPaleo: { type: Boolean, default: false },
  isNutFree: { type: Boolean, default: false },
  isDairyFree: { type: Boolean, default: false },
}, {
  timestamps: true
});

// Create text index for efficient searching
foodItemSchema.index({ 
  name: 'text', 
  alternateNames: 'text', 
  searchTags: 'text',
  brand: 'text',
  description: 'text'
});

// Method to calculate nutritional content for a custom quantity
foodItemSchema.methods.calculateNutrition = function(quantity, unit = this.baseUnit) {
  // Convert unit if needed (would need a more complex implementation for full unit conversion)
  let scaledQuantity = quantity;
  if (unit !== this.baseUnit) {
    // Basic conversion, would need expansion for real app
    if (unit === 'oz' && this.baseUnit === 'g') {
      scaledQuantity = quantity * 28.35;  // Convert oz to g
    }
    // Add more conversions as needed
  }
  
  // Calculate the scale factor
  const scaleFactor = scaledQuantity / this.baseQuantity;
  
  // Return scaled nutritional values
  return {
    calories: Math.round(this.calories * scaleFactor),
    protein: Number((this.protein * scaleFactor).toFixed(1)),
    carbs: Number((this.carbs * scaleFactor).toFixed(1)),
    fats: Number((this.fats * scaleFactor).toFixed(1)),
    fiber: this.fiber ? Number((this.fiber * scaleFactor).toFixed(1)) : undefined,
    sugar: this.sugar ? Number((this.sugar * scaleFactor).toFixed(1)) : undefined,
    saturatedFat: this.saturatedFat ? Number((this.saturatedFat * scaleFactor).toFixed(1)) : undefined,
    // For micronutrients, we would need a more complex calculation
  };
};

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem; 