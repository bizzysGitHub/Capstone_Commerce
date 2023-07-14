import { Key, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories-contexts";
import IStoreProducts from "../../interfaces/products";
import ProductCard from "../product-card/product-card-component";
import '../category-preview/category-preview.styles.scss'
import ErrorPage from "../../error-page";
import './category.styles.scss'


const Categories = () => {
  const { product } = useParams();
  const { categoriesMap } =  useContext(CategoriesContext)

  console.log(categoriesMap)
  /**
   * 
   * if categoresMap doesnt contain product throw error component, 
   * 
   * if it does match the product with the item in categories map and render all the data
  */
  // const allProducts: IStoreProducts['items'] = categoriesMap[product as keyof typeof categoriesMap]

  const allProducts: IStoreProducts['items'] = categoriesMap[product as keyof typeof categoriesMap]
  
  const [first, setfirst] = useState(allProducts)

  useEffect(() => {
    setfirst(allProducts)
  }, [product, categoriesMap])
  
  

  return (
    <div className="category-container">
     {
      first && first.map((productItem: any) => 
         (<ProductCard key={productItem.id} product={productItem} />)
      )
     }
    </div>
  )
}

export default Categories