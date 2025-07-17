import { useParams } from "react-router";
import ProductCard from "../product-card/product-card-component";
import { CategoryContainer } from './category.styles'
import { useAppSelector } from "../../app/hooks/custom";
import { Suspense } from "react";
import Fallback from "../../ui/fall-back";
import { CategoryItem } from "@/utils/types";



const Categories = () => {
  const { product } = useParams();


  const categoryData = useAppSelector((state) => state.categories)
  const { isLoading, categoriesMap } = categoryData

  const allProducts: CategoryItem[] = categoriesMap.flatMap((data) => {
    const category = data[product as string]
    return category ? category.items : []

  })


  return (
    <Suspense fallback={<Fallback />}>
      <CategoryContainer>
        {allProducts && allProducts.map((productItem: CategoryItem) => (<ProductCard key={productItem.id} product={productItem} />))}
      </CategoryContainer>
    </Suspense>)

}

export default Categories