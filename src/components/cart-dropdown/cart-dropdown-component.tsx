import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks/custom'
import { showDropdown } from '../../features/cart-items/cartItemSlice'
import { CartState } from '@/utils/types/category'
import CartItem from '../cart-item/cart-item-component'

const CartDropdown = () => {
  const navigate = useNavigate()
  const reduxCart = useAppSelector((state: { cartItems: CartState }) => state.cartItems)
  const dispatch = useAppDispatch()

  const goToCheckoutHandler = () => {
    navigate('/checkout')
    dispatch(showDropdown())
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 84,
        right: 0,
        width: 320,
        maxHeight: 420,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        background: 'var(--panel-bg-strong)',
        border: '1px solid var(--panel-border)',
        borderRadius: 24,
        boxShadow: '0 26px 64px var(--shadow-color)',
        zIndex: 200,
      }}
    >
      <div style={{ color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '0.05em' }}>YOUR CART</div>
      <div style={{ display: 'grid', gap: '0.75rem', flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: '0.25rem' }}>
        {reduxCart.itemsInCart.length < 1 ? (
          <p style={{ margin: 0, textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>No items in your cart</p>
        ) : (
          reduxCart.itemsInCart.map((item) => <CartItem item={item} key={item.id} />)
        )}
      </div>
      <button
        type="button"
        onClick={goToCheckoutHandler}
        style={{
          border: 'none',
          borderRadius: 16,
          background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-deep))',
          color: '#1b1230',
          padding: '0.9rem 1rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Go To Checkout
      </button>
    </div>
  )
}

export default CartDropdown
