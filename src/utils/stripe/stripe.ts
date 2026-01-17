import { Stripe } from "stripe";
import { CategoryItem } from "../types";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SK_KEY, {
     apiVersion: '2025-03-31.basil' as Stripe.LatestApiVersion
})

export const session = async (cartItems : CategoryItem[]) => {
     const items = cartItems.map((item) => ({
          price_data: {
               currency: 'usd',
               product_data: {
                    name: item.name,
               },
               unit_amount: item.price ,
          },
          quantity: item.quantity,

     }))
     console.log(items);
     
    const sess1 = await stripe.checkout.sessions.create({
          line_items: items,
          mode:'payment',
          ui_mode:'custom',
          // redirect_on_completion:'never'
          // return_url:'http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}'
     })
     return sess1.client_secret
}