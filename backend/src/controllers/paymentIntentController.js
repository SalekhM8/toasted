const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
      console.log('Received payment intent request:', req.body);
      const { planType, amount, isUpgrade = false } = req.body;  // Add isUpgrade with default false
  
      // Log the received data
      console.log('Plan Type:', planType);
      console.log('Amount:', amount);
      console.log('Is Upgrade:', isUpgrade);
  
      // Calculate amount based on plan type and if it's an upgrade
      let calculatedAmount;
      if (isUpgrade) {
        calculatedAmount = 299; // £2.99 flat upgrade fee
      } else {
        switch (planType) {
          case 'bundle':
            calculatedAmount = 499; // £4.99
            break;
          case 'diet_only':
            calculatedAmount = 299; // £2.99
            break;
          case 'workout_only':
            calculatedAmount = 249; // £2.49
            break;
          default:
            throw new Error('Invalid plan type');
        }
      }

    console.log('Calculated amount:', calculatedAmount);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculatedAmount,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        planType,
      },
    });

    console.log('Payment Intent created:', {
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret ? 'Present' : 'Missing',
      status: paymentIntent.status
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = { createPaymentIntent };