const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        
        const charge = await stripe.charges.create({
           amount: 500,
           currency: 'usd',
           description: 'You wasted your money',
           source: req.body.id
       });
       
       //only with passport can i do this
       req.user.credits += 5;
       const user = await req.user.save();

       res.send(user);
    });
};