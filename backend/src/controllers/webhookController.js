const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      await updateSubscriptionStatus(subscription);
      break;
      
    case 'customer.subscription.deleted':
      const cancelledSubscription = event.data.object;
      await handleCancelledSubscription(cancelledSubscription);
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      await handleSuccessfulPayment(invoice);
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      await handleFailedPayment(failedInvoice);
      break;
  }

  res.json({ received: true });
};

const updateSubscriptionStatus = async (stripeSubscription) => {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: stripeSubscription.id
  });

  if (subscription) {
    subscription.status = stripeSubscription.status;
    subscription.currentPeriodEnd = new Date(stripeSubscription.current_period_end * 1000);
    await subscription.save();
  }
};

const handleCancelledSubscription = async (stripeSubscription) => {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: stripeSubscription.id
  });

  if (subscription) {
    subscription.status = 'canceled';
    await subscription.save();
  }
};

const handleSuccessfulPayment = async (invoice) => {
  const subscription = await Subscription.findOne({
    stripeCustomerId: invoice.customer
  });

  if (subscription) {
    subscription.status = 'active';
    await subscription.save();
  }
};

const handleFailedPayment = async (invoice) => {
  const subscription = await Subscription.findOne({
    stripeCustomerId: invoice.customer
  });

  if (subscription) {
    subscription.status = 'past_due';
    await subscription.save();
  }
};

module.exports = {
  handleWebhook
};