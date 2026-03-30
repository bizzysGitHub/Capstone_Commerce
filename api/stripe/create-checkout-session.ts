import { createCheckoutSession, type CheckoutRequestItem } from '../../server/stripe/create-checkout-session'

export default async function handler(req: { method?: string; body?: unknown; headers: Record<string, string | undefined> }, res: { status: (code: number) => { json: (payload: unknown) => void } }) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  try {
    const body =
      typeof req.body === 'string'
        ? (JSON.parse(req.body) as { items?: CheckoutRequestItem[] })
        : ((req.body ?? {}) as { items?: CheckoutRequestItem[] })

    const { items } = body

    if (!items || !items.length) {
      res.status(400).json({ error: 'Cart items are required.' })
      return
    }

    const origin =
      req.headers.origin ??
      `https://${req.headers.host}`

    const session = await createCheckoutSession({
      items,
      origin,
    })

    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create Stripe checkout session.'
    res.status(500).json({ error: message })
  }
}
