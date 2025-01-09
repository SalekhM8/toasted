// backend/src/routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/profileController');
const { protect } = require('../middlewares/authMiddleware');
const { validateProfileUpdate } = require('../middlewares/validateProfile');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteAccount);
router.put('/profile', validateProfileUpdate, updateProfile);

module.exports = router;