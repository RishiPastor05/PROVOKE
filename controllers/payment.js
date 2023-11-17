const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.payment=async(req,res)=>{
  console.log("inside the payment function");
    const { amount } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'INR',
                  product_data: {
                    name: 'Your Product Name',
                  },
                  unit_amount: amount * 100, 
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'https://www.youtube.com/', // Replace with your success URL
            cancel_url: 'https://yourwebsite.com/cancel',   // Replace with your cancel URL
          });
      
          res.status(200).json({ sessionId: session.id });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while creating the payment session.' });
        }
}