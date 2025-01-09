// backend/src/routes/progressRoutes.js
const express = require('express');
const { logWeight, getProgress, logCompletion } = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

// Updated routes to match controller method names
router.post('/progress/weight', logWeight);
router.get('/progress', getProgress);
router.post('/progress/completion', logCompletion);

module.exports = router;