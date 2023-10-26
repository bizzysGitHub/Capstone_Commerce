import { Suspense, useContext, useEffect, useState } from "react";
import { Await, useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories-contexts";
import IStoreProducts from "../../interfaces/products";
import ProductCard from "../product-card/product-card-component";
import '../category-preview/category-preview.styles.scss'
import ErrorPage from "../../error-page";
import './category.styles.scss'


const Categories = () => {
  const { product } = useParams();
  const { categoriesMap } = useContext(CategoriesContext)

  const allProducts: IStoreProducts['items'] = categoriesMap[product as keyof typeof categoriesMap];

  const [category, setCategory] = useState(allProducts || {});

  useEffect(() => {
    setCategory(allProducts)
  }, [allProducts, category, product])

  
  return (
    <>
      {Object.values(categoriesMap).length < 1
        ? <h3>Loading...</h3>
        : !allProducts
          ? <h3>Error No Page Found</h3>
          : <div className="category-container">
            {
              category && category.map((productItem: any) => (<ProductCard key={productItem.id} product={productItem} />))
            }
          </div>}
    </>
  )
}

export default Categories