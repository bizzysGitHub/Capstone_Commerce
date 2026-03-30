import { useAppSelector } from '../../app/hooks/custom'
import { CartState } from '@/utils/types'

const BagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 8.5h12l-1 11H7l-1-11Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9 8.5a3 3 0 0 1 6 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const CartIcon = ({ onClick }: { onClick: () => void }) => {
  const cart = useAppSelector((state: { cartItems: CartState }) => state.cartItems)

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 46,
        height: 46,
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        border: '1px solid var(--panel-border)',
        borderRadius: 999,
        background: 'rgba(85, 37, 131, 0.14)',
        color: 'var(--text-primary)',
        boxShadow: '0 10px 26px var(--shadow-color)',
        flexShrink: 0,
      }}
      aria-label="Open cart"
      title="Open cart"
    >
      <BagIcon />
      <span
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          minWidth: 20,
          height: 20,
          padding: '0 5px',
          display: 'grid',
          placeItems: 'center',
          borderRadius: 999,
          background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-deep))',
          color: '#22123d',
          fontSize: 11,
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {cart.totalItems}
      </span>
    </button>
  )
}

export default CartIcon
