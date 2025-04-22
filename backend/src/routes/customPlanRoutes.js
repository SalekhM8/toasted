const express = require('express');
const router = express.Router();
const customPlanController = require('../controllers/customPlanController');
const { protect } = require('../middlewares/authMiddleware'); // Correct import name

// Apply authentication middleware to all routes
router.use(protect);

// Generate custom training plan based on questionnaire responses
router.post('/generate', customPlanController.generateCustomPlan);

// Get user's custom training plan
router.get('/', customPlanController.getUserCustomPlan);

module.exports = router; 