import { useParams } from "react-router-dom";
import ProductCard from "../product-card/product-card-component";
import { CategoryContainer } from './category.styles'
import {  useAppSelector } from "../../app/hooks/custom";
import IStoreItems from "../../interfaces/storeItems";



const Categories = () => {
  const { product } = useParams();

  
  const categoryData = useAppSelector((state) => state.categories)
  const {isLoading,categoriesMap} = categoryData

  const allProducts: IStoreItems[] = categoriesMap[product as keyof typeof categoriesMap];

  
  return (
    <>
      {isLoading
        ? <h3> Loading...</h3>
        : !allProducts
          ? <h3>Error No Page Found</h3>
          : <CategoryContainer>
            {
              allProducts && allProducts.map((productItem: IStoreItems) => (<ProductCard key={productItem.id} product={productItem} />))
            }
          </CategoryContainer>}
          
    </>
  )
}

export default Categories