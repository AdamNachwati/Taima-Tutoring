require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { pkg, price, name, email, availability, ...formData } = req.body;
    const amount = parseInt(price.replace('$', '')) * 100; // CAD cents

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: {
            name: pkg,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      customer_email: email,
      metadata: { name, availability, ...formData },
      success_url: `http://localhost:5173/tutoring?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `http://localhost:5173/tutoring?status=cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Stripe backend running on http://localhost:3001');
});

