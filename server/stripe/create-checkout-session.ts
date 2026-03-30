import Stripe from 'stripe'
import { stripeCatalog } from './catalog'

export type CheckoutRequestItem = {
  id: string
  quantity: number
}

type CreateSessionArgs = {
  items: CheckoutRequestItem[]
  origin: string
  secretKey?: string
}

export const createCheckoutSession = async ({
  items,
  origin,
  secretKey = process.env.VITE_STRIPE_SK_KEY,
}: CreateSessionArgs) => {
  if (!secretKey) {
    throw new Error('Missing VITE_STRIPE_SK_KEY.')
  }

  if (!items.length) {
    throw new Error('Cart items are required.')
  }

  const validItems = items
    .filter((item) => item.quantity > 0)
    .map((item) => {
      const catalogItem = stripeCatalog.get(String(item.id))

      if (!catalogItem) {
        throw new Error(`Unknown product id: ${item.id}`)
      }

      return {
        ...catalogItem,
        quantity: item.quantity,
      }
    })

  const lineItems = validItems.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: item.imageUrl.startsWith('http') ? [item.imageUrl] : [],
        metadata: {
          productId: item.id,
        },
      },
      unit_amount: Math.round(item.price * 100),
    },
  }))

  if (lineItems.length === 0) {
    throw new Error('No valid cart items were provided.')
  }

  const orderSummary = validItems
    .map((item) => `${item.name} x${item.quantity}`)
    .join(', ')
    .slice(0, 500)

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-03-31.basil',
  })

  return await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    metadata: {
      orderSummary,
      itemCount: String(validItems.reduce((sum, item) => sum + item.quantity, 0)),
    },
    success_url: `${origin}/checkout?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?checkout=cancelled`,
  })
}

export const getCheckoutSessionStatus = async ({
  sessionId,
  secretKey = process.env.VITE_STRIPE_SK_KEY,
}: {
  sessionId: string
  secretKey?: string
}) => {
  if (!secretKey) {
    throw new Error('Missing VITE_STRIPE_SK_KEY.')
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-03-31.basil',
  })

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return {
    id: session.id,
    status: session.status,
    paymentStatus: session.payment_status,
    verifiedPaid: session.status === 'complete' && session.payment_status === 'paid',
  }
}
