import { useState } from "react"
import { CategoryItem } from "@/utils/types"
import { useAppDispatch } from "../../app/hooks/custom"
import { addItemToCart } from "../../features/cart-items/cartItemSlice"

type Props = {
  product: CategoryItem
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch()
  const { name, price, imageUrl } = product
  const [isHovered, setIsHovered] = useState(false)

  const addProductToCart = () => dispatch(addItemToCart(product))

  return (
    <article
      style={{
        width: '100%',
        maxWidth: 290,
        border: '1px solid var(--panel-border)',
        borderRadius: 24,
        overflow: 'hidden',
        background: 'var(--panel-bg)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 48px var(--shadow-color)',
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{ display: 'block', width: '100%', height: 320, objectFit: 'cover' }}
      />
      <div style={{ padding: '1rem', display: 'grid', gap: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
          <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.2, maxWidth: '70%' }}>{name}</strong>
          <span style={{ color: 'var(--accent-gold)', fontWeight: 800, whiteSpace: 'nowrap' }}>${price}</span>
        </div>
        <button
          type="button"
          onClick={addProductToCart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            border: 'none',
            borderRadius: 16,
            background: isHovered
              ? 'linear-gradient(135deg, var(--accent-gold), #ffe08a)'
              : 'linear-gradient(135deg, var(--accent-purple), #7b3fc3)',
            color: isHovered ? '#22123d' : '#fff',
            padding: '0.9rem 1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: isHovered
              ? '0 14px 28px rgba(253, 185, 39, 0.32)'
              : '0 10px 22px rgba(85, 37, 131, 0.24)',
            transition: 'all 160ms ease',
          }}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard
