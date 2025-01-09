const asyncHandler = require('express-async-handler');
const { stripe, SUBSCRIPTION_PRICES } = require('../config/stripeConfig');
const Subscription = require('../models/Subscription');

const paymentController = {
  createSubscription: asyncHandler(async (req, res) => {
    const { planType, paymentMethodId } = req.body;
    const userId = req.user._id;

    try {
      // Find or create Stripe customer
      let customer;
      let existingSubscription = await Subscription.findOne({ userId });

      if (existingSubscription?.stripeCustomerId) {
        customer = await stripe.customers.retrieve(existingSubscription.stripeCustomerId);
      } else {
        customer = await stripe.customers.create({
          email: req.user.email,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
      }

      // Create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: SUBSCRIPTION_PRICES[planType] }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      // Save subscription in our database
      const newSubscription = new Subscription({
        userId,
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        planType: planType.toLowerCase(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
      });

      await newSubscription.save();

      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } catch (error) {
      console.error('Subscription error:', error);
      res.status(400).json({ error: error.message });
    }
  }),

  cancelSubscription: asyncHandler(async (req, res) => {
    const subscription = await Subscription.findOne({ userId: req.user._id });
    
    if (!subscription) {
      res.status(404);
      throw new Error('No active subscription found');
    }

    await stripe.subscriptions.del(subscription.stripeSubscriptionId);
    subscription.status = 'canceled';
    await subscription.save();

    res.json({ message: 'Subscription cancelled successfully' });
  }),

  updatePaymentMethod: asyncHandler(async (req, res) => {
    const { paymentMethodId } = req.body;
    const subscription = await Subscription.findOne({ userId: req.user._id });

    if (!subscription) {
      res.status(404);
      throw new Error('No active subscription found');
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: subscription.stripeCustomerId,
    });

    await stripe.customers.update(subscription.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    res.json({ message: 'Payment method updated successfully' });
  }),

  getSubscriptionStatus: asyncHandler(async (req, res) => {
    const subscription = await Subscription.findOne({ userId: req.user._id });
    
    if (!subscription) {
      return res.json({ active: false });
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );

    res.json({
      active: stripeSubscription.status === 'active',
      planType: subscription.planType,
      currentPeriodEnd: subscription.currentPeriodEnd,
    });
  })
};

module.exports = paymentController;