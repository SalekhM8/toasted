const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createSubscription,
  cancelSubscription,
  updatePaymentMethod,
  getSubscriptionStatus
} = require('../controllers/paymentController');
const { createPaymentIntent } = require('../controllers/paymentIntentController');

// Apply protect middleware to all routes below this line
router.use(protect);

// Define routes
router.post('/create-subscription', createSubscription);
router.post('/cancel-subscription', cancelSubscription);
router.post('/update-payment-method', updatePaymentMethod);
router.get('/subscription-status', getSubscriptionStatus);
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;