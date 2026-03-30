import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks/custom"
import { CartState, CategoryItem } from "@/utils/types"
import { getItemWithPrice } from "@/utils/firebase/firebase"
import { redirectToStripeCheckout, verifyStripeCheckoutSession } from "@/utils/stripe/stripe"
import CheckoutItem from "../../components/checkout-item/checkout-item-component"
import { emptyCart } from "../../features/cart-items/cartItemSlice"

export const Checkout = () => {
  const cart = useAppSelector((state: { cartItems: CartState }) => state.cartItems)
  const { itemsInCart, totalPrice } = cart
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null)
  const [isVerifyingSession, setIsVerifyingSession] = useState(false)

  const checkoutStatus = useMemo(() => searchParams.get('checkout'), [searchParams])
  const sessionId = useMemo(() => searchParams.get('session_id'), [searchParams])
  const totalUnits = useMemo(
    () => itemsInCart.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
    [itemsInCart]
  )

  useEffect(() => {
    if (checkoutStatus === 'cancelled') {
      setCheckoutMessage('Checkout was cancelled before payment completed.')
      setCheckoutError(null)
      return
    }

    if (checkoutStatus !== 'success' || !sessionId) {
      return
    }

    let isMounted = true

    const verifySession = async () => {
      setIsVerifyingSession(true)
      setCheckoutError(null)

      try {
        const session = await verifyStripeCheckoutSession(sessionId)

        if (!isMounted) {
          return
        }

        if (!session.verifiedPaid) {
          setCheckoutMessage(null)
          setCheckoutError('Stripe did not confirm a completed payment for this checkout session.')
          return
        }

        if (itemsInCart.length > 0) {
          dispatch(emptyCart())
        }

        setCheckoutMessage('Payment finished in Stripe. Your cart has been cleared.')
      } catch (error) {
        if (!isMounted) {
          return
        }

        const message = error instanceof Error ? error.message : 'Unable to verify Stripe payment.'
        setCheckoutMessage(null)
        setCheckoutError(message)
      } finally {
        if (isMounted) {
          setIsVerifyingSession(false)
        }
      }
    }

    void verifySession()

    return () => {
      isMounted = false
    }
  }, [checkoutStatus, dispatch, itemsInCart.length, sessionId])

  const checkItems = async () => {
    await getItemWithPrice()
  }

  const handleStripeCheckout = async () => {
    setCheckoutError(null)
    setIsRedirecting(true)

    try {
      await redirectToStripeCheckout(itemsInCart)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to start Stripe checkout.'
      setCheckoutError(message)
      setIsRedirecting(false)
    }
  }

  return (
    <section style={{ width: '100%', maxWidth: 1240, margin: '0 auto', padding: '1.25rem 0' }}>
      <div
        className="checkout-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.9fr) minmax(300px, 0.9fr)',
          gap: '1.25rem',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            border: '1px solid var(--panel-border)',
            borderRadius: 28,
            background: 'var(--panel-bg)',
            padding: '1.25rem',
            boxShadow: '0 20px 52px var(--shadow-color)',
          }}
        >
          <div style={{ display: 'grid', gap: '0.2rem', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.06em' }}>CHECKOUT</span>
            <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--accent-purple-strong)' }}>Review your order</h1>
          </div>
          {checkoutMessage && (
            <p style={{ marginTop: 0, color: 'var(--accent-gold)', fontWeight: 700 }}>
              {checkoutMessage}
            </p>
          )}
          {isVerifyingSession && (
            <p style={{ marginTop: 0, color: 'var(--text-muted)', fontWeight: 700 }}>
              Confirming your Stripe payment...
            </p>
          )}
          <div
            className="checkout-grid"
            style={{
              width: '100%',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--panel-border)',
              fontWeight: 700,
              color: 'var(--text-muted)',
            }}
          >
            <span>Products</span>
            <span>Description</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Remove</span>
          </div>
          <div>
            {itemsInCart.map((cartItem: CategoryItem) => (
              <CheckoutItem key={cartItem.id} item={cartItem} />
            ))}
          </div>
        </div>

        <aside
          style={{
            position: 'sticky',
            top: '1rem',
            border: '1px solid var(--panel-border)',
            borderRadius: 28,
            background: 'var(--panel-bg)',
            padding: '1.25rem',
            boxShadow: '0 20px 52px var(--shadow-color)',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'grid', gap: '0.25rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.06em' }}>ORDER SUMMARY</span>
            <h2 style={{ margin: 0, color: 'var(--accent-purple-strong)' }}>Ready for Stripe</h2>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {itemsInCart.length === 0 ? (
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Your cart is currently empty.</p>
            ) : (
              itemsInCart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '0.75rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid var(--panel-border)',
                  }}
                >
                  <div style={{ display: 'grid', gap: '0.2rem' }}>
                    <strong style={{ color: 'var(--text-primary)', lineHeight: 1.25 }}>{item.name}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                      Qty {item.quantity ?? 0}
                    </span>
                  </div>
                  <strong style={{ color: 'var(--accent-gold)' }}>
                    ${(item.quantity ?? 0) * item.price}
                  </strong>
                </div>
              ))
            )}
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Total items</span>
              <strong style={{ color: 'var(--text-primary)' }}>{totalUnits}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>Order total</span>
              <strong style={{ fontSize: '1.5rem', color: 'var(--accent-gold)' }}>${totalPrice}</strong>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleStripeCheckout}
              disabled={isRedirecting || itemsInCart.length === 0}
              style={{
                border: 'none',
                borderRadius: 16,
                background: 'linear-gradient(135deg, var(--accent-purple), #7b3fc3)',
                color: '#fff',
                padding: '0.9rem 1rem',
                cursor: isRedirecting || itemsInCart.length === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                opacity: isRedirecting || itemsInCart.length === 0 ? 0.7 : 1,
              }}
            >
              {isRedirecting ? 'Redirecting to Stripe...' : 'Pay with Stripe'}
            </button>
            <button
              type="button"
              onClick={checkItems}
              style={{
                border: '1px solid var(--panel-border)',
                borderRadius: 16,
                background: 'rgba(85, 37, 131, 0.14)',
                color: 'var(--text-primary)',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Refresh Price Data
            </button>
            {checkoutError && (
              <p style={{ margin: 0, color: '#ef4444', fontWeight: 700 }}>
                {checkoutError}
              </p>
            )}
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
              Hosted Stripe Checkout will show the same line items again before payment.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
