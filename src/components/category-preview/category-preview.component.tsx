import { Link } from 'react-router'
import { useAppSelector } from '../../app/hooks/custom'
import { CategoryItem, CategoryMap } from '@/utils/types'
import ProductCard from '../product-card/product-card-component'

const SectionItemsPreview = (products: CategoryItem[]) =>
  products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)

const CategoryPreview = () => {
  const { categoriesMap } = useAppSelector((state) => state.categories)

  return (
    <div style={{ display: 'grid', gap: '2.2rem' }}>
      {categoriesMap.map((productObject: CategoryMap, id: number) => {
        const [title, data] = Object.entries(productObject)[0]

        return (
          <section key={id} style={{ display: 'grid', gap: '1rem' }}>
            <Link to={title} style={{ textDecoration: 'none', color: 'var(--accent-purple-strong)' }}>
              <h2 style={{ margin: 0, letterSpacing: '0.06em' }}>{title.toUpperCase()}</h2>
            </Link>
            <div className="shop-card-grid">
              {SectionItemsPreview(data.items)}
            </div>
          </section>
        )
      })}
      {categoriesMap.length === 0 && <p style={{ margin: 0 }}>No categories available yet.</p>}
    </div>
  )
}

export default CategoryPreview
