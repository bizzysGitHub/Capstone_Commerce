import { CategoryItem } from '@/utils/types'

type Props = {
  item: CategoryItem
}

const CartItem = ({ item: { name, price, imageUrl, quantity = 0 } }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'stretch',
        border: '1px solid var(--panel-border)',
        borderRadius: 16,
        padding: '0.6rem',
        background: 'rgba(85, 37, 131, 0.08)',
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12 }}
      />
      <div style={{ display: 'grid', gap: '0.35rem', alignContent: 'center', color: 'var(--text-primary)' }}>
        <strong style={{ lineHeight: 1.2 }}>{name}</strong>
        <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{quantity} x ${price * quantity}</span>
      </div>
    </div>
  )
}

export default CartItem
