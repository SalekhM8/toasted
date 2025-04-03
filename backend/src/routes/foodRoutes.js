const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { foodController } = require('../controllers/foodController');

// Search for food items
router.get('/search', protect, foodController.searchFoodItems);

// Get a specific food item
router.get('/:id', protect, foodController.getFoodItem);

// Calculate nutrition for a quantity
router.post('/calculate-nutrition', protect, foodController.calculateNutrition);

// Admin-only routes (if implemented)
router.post('/', protect, foodController.addFoodItem);
router.put('/:id', protect, foodController.updateFoodItem);
router.delete('/:id', protect, foodController.deleteFoodItem);

module.exports = router; 