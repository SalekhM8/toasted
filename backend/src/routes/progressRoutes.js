// backend/src/routes/progressRoutes.js
const express = require('express');
const { 
  logWeight, 
  getProgress, 
  logCompletion, 
  logExerciseCompletion,
  swapExercise
} = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Remove the blanket middleware
// router.use(protect);

// Apply protect middleware to each individual route that needs authentication
router.post('/progress/weight', protect, logWeight);
router.get('/progress', protect, getProgress);
router.post('/progress/completion', protect, logCompletion);

// New routes for workout tracking
router.post('/progress/exercise', protect, logExerciseCompletion);
router.post('/progress/swap-exercise', protect, swapExercise);

module.exports = router;