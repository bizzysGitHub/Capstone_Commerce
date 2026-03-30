import { getCheckoutSessionStatus } from '../../server/stripe/create-checkout-session'

type QueryValue = string | string[] | undefined

const getFirstQueryValue = (value: QueryValue) => (Array.isArray(value) ? value[0] : value)

export default async function handler(
  req: { method?: string; query?: Record<string, QueryValue> },
  res: { status: (code: number) => { json: (payload: unknown) => void } }
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  try {
    const sessionId = getFirstQueryValue(req.query?.session_id)

    if (!sessionId) {
      res.status(400).json({ error: 'Missing session_id.' })
      return
    }

    const session = await getCheckoutSessionStatus({ sessionId })
    res.status(200).json(session)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load Stripe checkout session.'
    res.status(500).json({ error: message })
  }
}
