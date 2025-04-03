const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  logoutUser,
  socialAuth
} = require('../controllers/authController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/social', socialAuth);

// Protected routes
router.post('/logout', protect, logoutUser);

module.exports = router;