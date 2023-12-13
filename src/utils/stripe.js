
const stripe = require('stripe')('sk_test_51O6gPfFn5luHCKbsV5K53tSFTFUDE8xt6r3VFW2LnSD3dlw1kDkwa7i0ORgAciw3FzKjYUFHKZaWbHYkvzHR0UT700cbZJSajD');
const express = require('express');

//PUESTO
require("dotenv").config();
const router = express.Router();

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url:session.url});
  });

  module.exports =router;