
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
const session = new Stripe("sk_test_51Oy17F2Lmqh9OD3Z3TpsM5iUNoToLhFYfZYR9V1ZiOGWrkHy82BkJuLHrcEM8SBfFZcJ4OOtEq0kMNeGOUf9jz4p00pM8awjOu")

const paymentData= await session.checkout.sessions.create(
    {
        payment_method_types:["card"],
        mode : "payment",
        customer_email,
        metadata,
        
        success_url:"http://localhost:5173/shop/stripe-success",
        cancel_url:"http://localhost:5000/shop//shop/stripe-cancel",
        
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