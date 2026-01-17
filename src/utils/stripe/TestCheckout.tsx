

import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { getItemWithPrice } from '@/utils/firebase/firebase';
import { useAppSelector } from '@/app/hooks/custom';
import { CartState } from '../types';
import { session } from './stripe';


// Initialize Stripe with public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
import { StripeCheckout } from '@/routes/checkout/checkout-component';

export const TestCheckout = () => {
    const [error, setError] = useState<string | null>(null);
    const { itemsInCart } = useAppSelector((state: { cartItems: CartState }) => state.cartItems);

    


    const validateCartAndCreateSession = async (): Promise<string> => {
        try {
            const inventory = await getItemWithPrice();
            
            const validatedItems = itemsInCart.reduce<CartState["itemsInCart"]>((acc, item) => {

                const inventoryID = Object.keys(inventory).find(product =>  product === item.id)
                if (!inventoryID) {
                    console.log(item.id);
                    console.log(inventory);
                    
                    throw new Error(`Item ${item.id} not found in inventory`);
                }

                
                acc.push({
                    ...item,
                    id:inventoryID,
                    name:inventory[inventoryID].name,
                    price: inventory[inventoryID].price
                });
                return acc;
            }, []);

            const clientSecret = await session(validatedItems);
            if (!clientSecret) {
                throw new Error("Failed to create payment session");
            }
            
            return clientSecret;

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred during checkout";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    if (error) {
        return <div role="alert" style={{ color: 'red', padding: '1rem' }}>{error}</div>;
    }

    return (
        <CheckoutProvider 
            stripe={stripePromise} 
            options={{
                fetchClientSecret: validateCartAndCreateSession,
                elementsOptions: {
                    appearance:{
                        theme:'stripe'
                    }
                }
            }}
        >
           <StripeCheckout/>
        </CheckoutProvider>
    );
};


