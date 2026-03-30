import { loadStripe } from '@stripe/stripe-js'
import { CategoryItem } from '../types'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY)

type CheckoutPayloadItem = {
  id: string
  quantity: number
}

const buildCheckoutItems = (cartItems: CategoryItem[]): CheckoutPayloadItem[] =>
  cartItems
    .filter((item) => (item.quantity ?? 0) > 0)
    .map((item) => ({
      id: String(item.id),
      quantity: item.quantity ?? 0,
    }))

export const redirectToStripeCheckout = async (cartItems: CategoryItem[]) => {
  const items = buildCheckoutItems(cartItems)

  if (items.length === 0) {
    throw new Error('Your cart is empty.')
  }

  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  })

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    throw new Error(errorPayload?.error ?? 'Unable to start Stripe checkout.')
  }

  const { sessionId } = (await response.json()) as { sessionId?: string }

  if (!sessionId) {
    throw new Error('Stripe session was not created.')
  }

  const stripe = await stripePromise

  if (!stripe) {
    throw new Error('Stripe.js failed to load.')
  }

  const result = await stripe.redirectToCheckout({ sessionId })

  if (result.error) {
    throw new Error(result.error.message ?? 'Stripe redirect failed.')
  }
}

export const verifyStripeCheckoutSession = async (sessionId: string) => {
  const response = await fetch(`/api/stripe/checkout-session?session_id=${encodeURIComponent(sessionId)}`)

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    throw new Error(errorPayload?.error ?? 'Unable to verify Stripe payment.')
  }

  return (await response.json()) as {
    id: string
    status: string | null
    paymentStatus: string | null
    verifiedPaid: boolean
  }
}
