const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stripeCustomerId: {
    type: String,
    required: true
  },
  stripeSubscriptionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'past_due', 'canceled', 'unpaid'],
    default: 'active'
  },
  planType: {
    type: String,
    enum: ['workout_only', 'diet_only', 'bundle'],
    required: true
  },
  currentPeriodEnd: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);