import { useParams } from "react-router";
import ProductCard from "../product-card/product-card-component";
import { CategoryContainer } from './category.styles'
import { useAppSelector } from "../../app/hooks/custom";
import IStoreItems from "../../interfaces/storeItems";
import { Suspense } from "react";
import Fallback from "../../ui/fall-back";



const Categories = () => {
  const { product } = useParams();


  const categoryData = useAppSelector((state) => state.categories)
  const { isLoading, categoriesMap } = categoryData

  const allProducts: IStoreItems[] = categoriesMap[product as keyof typeof categoriesMap];


  return (
    <Suspense fallback={<Fallback />}>
      <CategoryContainer>
        {allProducts && allProducts.map((productItem: IStoreItems) => (<ProductCard key={productItem.id} product={productItem} />))}
      </CategoryContainer>
    </Suspense>)

}

export default Categories