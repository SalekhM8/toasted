const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  logoutUser
} = require('../controllers/authController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.post('/logout', protect, logoutUser);

module.exports = router;