// controllers/foodController.js
const asyncHandler = require('express-async-handler');
const FoodItem = require('../models/FoodItem');

const foodController = {
  // Search for food items based on query, category, and other filters
  searchFoodItems: asyncHandler(async (req, res) => {
    const { 
      query = '', 
      category = 'all', 
      limit = 20, 
      page = 1,
      sort = 'popularity' 
    } = req.query;
    
    // Build the search filters
    const searchFilters = {};
    
    // Add text search if query is provided
    if (query && query.length > 0) {
      searchFilters.$text = { $search: query };
    }
    
    // Add category filter if not 'all'
    if (category !== 'all') {
      searchFilters.category = category;
    }
    
    // Additional filters can be added here (e.g., dietary preferences)
    if (req.query.isGlutenFree === 'true') {
      searchFilters.isGlutenFree = true;
    }
    
    if (req.query.isVegan === 'true') {
      searchFilters.isVegan = true;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Define sort option
    let sortOption = {};
    if (sort === 'calories_asc') {
      sortOption = { calories: 1 };
    } else if (sort === 'calories_desc') {
      sortOption = { calories: -1 };
    } else if (sort === 'protein_desc') {
      sortOption = { protein: -1 };
    } else {
      // Default sort by popularity and then name
      sortOption = { popularity: -1, name: 1 };
    }
    
    // If using text search, also sort by text score
    if (query && query.length > 0) {
      sortOption.score = { $meta: 'textScore' };
    }
    
    // Execute the search query
    const foodItems = await FoodItem.find(searchFilters)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      // Only select necessary fields for the list view
      .select('name category calories protein carbs fats brand commonServingSize commonServingUnit isPackaged');
    
    // Get total count for pagination
    const total = await FoodItem.countDocuments(searchFilters);
    
    res.json({
      items: foodItems,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  }),
  
  // Get a specific food item by ID
  getFoodItem: asyncHandler(async (req, res) => {
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem) {
      res.status(404);
      throw new Error('Food item not found');
    }
    
    res.json(foodItem);
  }),
  
  // Calculate nutrition for a specific quantity
  calculateNutrition: asyncHandler(async (req, res) => {
    const { foodItemId, quantity, unit } = req.body;
    
    if (!foodItemId || !quantity) {
      res.status(400);
      throw new Error('Food item ID and quantity are required');
    }
    
    const foodItem = await FoodItem.findById(foodItemId);
    
    if (!foodItem) {
      res.status(404);
      throw new Error('Food item not found');
    }
    
    // Use the model method to calculate nutrition
    const nutritionData = foodItem.calculateNutrition(quantity, unit || foodItem.baseUnit);
    
    res.json({
      ...nutritionData,
      name: foodItem.name,
      quantity,
      unit: unit || foodItem.baseUnit
    });
  }),
  
  // Admin-only function to add a new food item
  addFoodItem: asyncHandler(async (req, res) => {
    // In a production app, you would add role-based authentication here
    // For now, we'll just implement the basic functionality
    
    const newFoodItem = await FoodItem.create(req.body);
    res.status(201).json(newFoodItem);
  }),
  
  // Admin-only function to update a food item
  updateFoodItem: asyncHandler(async (req, res) => {
    // In a production app, you would add role-based authentication here
    
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem) {
      res.status(404);
      throw new Error('Food item not found');
    }
    
    const updatedFoodItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedFoodItem);
  }),
  
  // Admin-only function to delete a food item
  deleteFoodItem: asyncHandler(async (req, res) => {
    // In a production app, you would add role-based authentication here
    
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem) {
      res.status(404);
      throw new Error('Food item not found');
    }
    
    await foodItem.remove();
    
    res.json({ message: 'Food item removed' });
  })
};

module.exports = { foodController }; 