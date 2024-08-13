import {  useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../product-card/product-card-component";
// import '../category-preview/category-preview.styles.scss'
// import { CategoryPreviewContainer, Title, Preview } from '../category-preview/category-preview.styles'

import { CategoryContainer } from './category.styles'
import {  useAppSelector } from "../../app/hooks/custom";
// import { getCategories } from "../../features/categories/categorySlice";
import IStoreItems from "../../interfaces/storeItems";



const Categories = () => {
  const { product } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext)
  
  const categoryData = useAppSelector((state) => state.categories)
  // const dispatch = useAppDispatch()
  const {isLoading,categoriesMap} = categoryData


  
  const allProducts: IStoreItems[] = categoriesMap[product as keyof typeof categoriesMap];

  // const [category, setCategory] = useState(allProducts || {});
  // console.log(allProducts);
  

  useEffect(() => {
    // setCategory(allProducts)
    // const loadingShouldBeDifferent = async () => {
    //   await dispatch(getCategories()).unwrap()
    // }
    // loadingShouldBeDifferent()

  }, [])

  
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