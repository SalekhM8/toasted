// routes/planRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware'); // Your existing auth middleware
const { planController } = require('../controllers/planController');
const { checkPlan } = require('../middlewares/planCheck');  // The middleware we created

// Routes that don't need plan check
router.post('/select', protect, planController.selectPlan);

// Routes that need both auth and plan check
router.get('/today', protect, checkPlan, planController.getTodaysPlan);
router.get('/week', protect, checkPlan, planController.getWeekPlan);
router.post('/complete/workout', protect, checkPlan, planController.completeWorkout);
router.post('/complete/meal', protect, checkPlan, planController.completeMeal);
// Add this to your planRoutes.js file
router.put('/modify', protect, planController.modifyPlan);

module.exports = router;