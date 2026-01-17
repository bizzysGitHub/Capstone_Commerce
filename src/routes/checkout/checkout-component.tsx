import CheckoutItem from "../../components/checkout-item/checkout-item-component"
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'
import { useAppSelector } from "../../app/hooks/custom"
// import CartState from "../../interfaces/cartItems"
import { CartState, CategoryItem } from "@/utils/types"
import { Button } from "@radix-ui/themes"
import { TestCheckout } from "@/utils/stripe/TestCheckout"
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout"
import { getItemWithPrice } from "@/utils/firebase/firebase"
import { useState } from "react"

export const Checkout = () => {
    const cart = useAppSelector((state: { cartItems: CartState }) => state.cartItems)
    const { itemsInCart, totalPrice } = cart

    const checkTings = async () => {
        await getItemWithPrice()
    }

    return (
        <>
            <CheckoutContainer>
                <CheckoutHeader>
                    <HeaderBlock><span className="">Products</span></HeaderBlock>
                    <HeaderBlock><span className="">Description</span></HeaderBlock>
                    <HeaderBlock><span className="">Quantity</span></HeaderBlock>
                    <HeaderBlock><span className="">Price</span></HeaderBlock>
                    <HeaderBlock><span className="">Remove</span></HeaderBlock>
                </CheckoutHeader>
                {itemsInCart.map((cartItem: CategoryItem) => (
                    <CheckoutItem key={cartItem.id} item={cartItem} />
                ))}
                <Total>${totalPrice}</Total>
                <Button onClick={checkTings}> look at mee</Button>
            </CheckoutContainer>
        </>
    )
}

export const StripeCheckout = () => {

    const checkoutState = useCheckout();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [statusMessage, setStatusMessage] = useState<string | null>(null)

    if (checkoutState.type === 'loading') {
        return <p>Loading checkout...</p>
    }

    if (checkoutState.type === 'error') {
        return (
            <div role="alert">
                Unable to load checkout: {checkoutState.error.message}
            </div>
        )
    }

    const { checkout } = checkoutState
    const lineItems = checkout.lineItems

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSubmitting || !checkout.canConfirm) return

        setStatusMessage(null)
        setIsSubmitting(true)

        try {
            const result = await checkout.confirm()
            if (result.type === 'error') {
                setStatusMessage(result.error.message ?? 'Unable to complete payment. Please check your details.')
                setIsSubmitting(false)
                return
            }

            setStatusMessage('Success! Redirecting to complete payment...')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
            setStatusMessage(message)
            setIsSubmitting(false)
        }
    }


    return (
        <form onSubmit={handleSubmit} 
        // style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 480 }}
        >
         <section>
{/* <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}> */}
                    {lineItems.map((item : any) => (
                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                            <span>{item.name} &times; {item.quantity}</span>
                            <span>{item.total.amount}</span>
                        </li>
                    ))}
                {/* </ul> */}
         </section>
            <PaymentElement id="payment-element" />
            {statusMessage && (
                <p role={statusMessage.startsWith('Success') ? 'status' : 'alert'} style={{ margin: 0, color: statusMessage.startsWith('Success') ? '#0f9d58' : '#d93025' }}>
                    {statusMessage}
                </p>
                
            )
            }
            <button type="submit" disabled={isSubmitting || !checkout.canConfirm} style={{ padding: '0.75rem 1.25rem', border: 'none', borderRadius: 4, background: '#5469d4', color: '#fff', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                {isSubmitting ? 'Processing...' : 'Confirm and pay'}
            </button>
        </form>
    )
}

/*
   <section style={{ border: '1px solid #e2e2e2', borderRadius: 8, padding: '1rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Order summary</h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {lineItems.map((item : any) => (
                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                            <span>{item.name} &times; {item.quantity}</span>
                            <span>{item.total.amount}</span>
                        </li>
                    ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontWeight: 600 }}>
                    <span>Total</span>
                    <span>{checkout.total.total.amount}</span>
                </div>
            </section>
            */