import { useAppDispatch } from '../../app/hooks/custom'
import { addItemToCart, removeItemFromCart, zeroOutItem } from '../../features/cart-items/cartItemSlice'
import { CategoryItem } from "@/utils/types";

type Props = {
  item: CategoryItem
}

const actionStyle = {
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  fontSize: '1rem',
  padding: 0,
} as const

const CheckoutItem = ({ item }: Props) => {
  const { id, name, imageUrl, price, quantity = 0 } = item
  const dispatch = useAppDispatch()

  return (
    <div
      key={id}
      className="checkout-grid"
      style={{
        width: '100%',
        minHeight: 112,
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid var(--panel-border)',
      }}
    >
      <img src={imageUrl} alt={name} style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 12 }} />
      <span style={{ color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.3 }}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
        <button type="button" style={{ ...actionStyle, color: 'var(--accent-gold)', fontSize: '1.3rem' }} onClick={() => dispatch(removeItemFromCart(item))}>
          &#10094;
        </button>
        <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
        <button type="button" style={{ ...actionStyle, color: 'var(--accent-gold)', fontSize: '1.3rem' }} onClick={() => dispatch(addItemToCart(item))}>
          &#10095;
        </button>
      </div>
      <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>${price * quantity}</span>
      <button type="button" style={{ ...actionStyle, color: 'var(--text-primary)', fontSize: '1.2rem' }} onClick={() => dispatch(zeroOutItem(item))}>
        &#10005;
      </button>
    </div>
  )
}

export default CheckoutItem
