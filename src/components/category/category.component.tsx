import { Suspense } from "react"
import { useParams } from "react-router"
import { useAppSelector } from "../../app/hooks/custom"
import { CategoryItem } from "@/utils/types"
import ProductCard from "../product-card/product-card-component"
import Fallback from "../../ui/fall-back"

const Categories = () => {
  const { product } = useParams()
  const { categoriesMap } = useAppSelector((state) => state.categories)

  const allProducts: CategoryItem[] = categoriesMap.flatMap((data) => {
    const category = data[product as string]
    return category ? category.items : []
  })

  return (
    <Suspense fallback={<Fallback />}>
      <div className="shop-card-grid">
        {allProducts.map((productItem) => (
          <ProductCard key={productItem.id} product={productItem} />
        ))}
      </div>
    </Suspense>
  )
}

export default Categories
