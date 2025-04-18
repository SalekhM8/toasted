// routes/planRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware'); // Your existing auth middleware
const planController = require('../controllers/planController').planController;
const preferenceController = require('../controllers/preferenceController');
const { checkPlan } = require('../middlewares/planCheck');  // The middleware we created

// Routes that don't need plan check
router.post('/select', protect, planController.selectPlan);
router.get('/user', protect, planController.getUserPlans);
// Temporary simple handlers for these routes
router.get('/diet-options', (req, res) => res.json([]));
router.get('/workout-options', (req, res) => res.json([]));

// Routes that need both auth and plan check
router.get('/today', protect, checkPlan, planController.getTodaysPlan);
router.get('/week', protect, checkPlan, planController.getWeekPlan);
router.post('/complete/workout', protect, checkPlan, planController.completeWorkout);
router.post('/complete/meal', protect, checkPlan, planController.completeMeal);
// Add this to your planRoutes.js file
router.put('/modify', protect, planController.modifyPlan);
// Shopping list endpoint
router.get('/shopping-list', protect, checkPlan, planController.getShoppingList);

// New meal swap endpoints
router.get('/find-alternative-meals', protect, checkPlan, planController.findAlternativeMeals);
router.post('/swap-meal', protect, checkPlan, planController.swapMeal);
router.get('/swap-options/:mealIndex/:dayIndex', protect, checkPlan, planController.getSwapOptions);

// New meal ingredient modification endpoints
router.put('/meals/:id/ingredients', protect, checkPlan, planController.updateMealIngredients);
router.post('/meals/:id/ingredients', protect, checkPlan, planController.addMealIngredient);
router.delete('/meals/:id/ingredients/:ingredientIndex', protect, checkPlan, planController.removeMealIngredient);
router.post('/meals/:id/migrate-ingredients', protect, checkPlan, planController.migrateMealIngredients);

// Debug endpoint
router.get('/meals/:id/debug', protect, planController.getMealDetails);

// Add new routes for advanced plan tailoring
router.post('/preference', protect, preferenceController.saveUserPreferences);
router.get('/preference', protect, preferenceController.getUserPreferences);
router.post('/generate-custom-plan', protect, preferenceController.generateCustomPlan);

// New route for getting exercise alternatives
router.get('/exercises/:exerciseName/alternatives', protect, planController.getExerciseAlternatives);

module.exports = router;