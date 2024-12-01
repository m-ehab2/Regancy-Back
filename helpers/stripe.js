
const Stripe = require("stripe")

// import Stripe from "stripe"

const createChickoutSession =async (
    {
        customer_email,
        metadata,
        discounts,
        line_items
    }
)=>{
    // const {confirm} = useCustomCheckout();
const session = new Stripe(process.env.STRIPE_SECRET_KEY)

const paymentData= await session.checkout.sessions.create(
    {
        payment_method_types:["card"],
        mode : "payment",
        customer_email,
        metadata,
        
        success_url:process.env.SUCCESS_URL,
        cancel_url:process.env.CANCEL_URL,
        
        discounts,
        line_items
    }
)                 

// stripe.confirmPayment({
//     elements,
//     confirmParams: {
//       // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
//       return_url: 'https://example.com',
//     },
//   })
//   .then(function(result) {
//     if (result.error) {
//       // Inform the customer that there was an error.
//     }
//   });

return paymentData
}





module.exports = {createChickoutSession}


// [
//     {
//         price_data:{
//             currency:"usd",
//             product_data:{
//                 name:"T-shitr"
//             },
//             unit_amount:300
//         },
//         quantity:1
//     }
// ]