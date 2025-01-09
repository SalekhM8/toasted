require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const SUBSCRIPTION_PRICES = {
    WORKOUT_ONLY: 'prod_RWkCJKOt2Uo5MU', // Workout Plan (£2.49)
    DIET_ONLY: 'prod_RWkDduyr6pHPSE',    // Diet Plan (£2.99)
    BUNDLE: 'prod_RWkEf6dCgyyZE6'        // Bundle Plan (43.99)
  };

const SUBSCRIPTION_AMOUNTS = {
  WORKOUT_ONLY: 2.49,
  DIET_ONLY: 2.99,
  BUNDLE: 4.99
};

module.exports = {
  stripe,
  SUBSCRIPTION_PRICES,
  SUBSCRIPTION_AMOUNTS
};