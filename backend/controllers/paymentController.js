const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const dotenv = require("dotenv");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MlWoySGndaBQ74hGg5fpcBCdMYWYTa1HwJEAh1pKqwCGosgs9ZvHhckEJFKEasZUatx0UeLeVUPRCxfzTOr5UJM00DRKfPjAP');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    let myPayment;
    try{
        myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Ecommerce",
            },
        });
    }catch(err){
        console.log("error in intial outcome is",err)
    }

    res.status(200)
        .json({ success: true, client_secret: myPayment.client_secret })
});


exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});