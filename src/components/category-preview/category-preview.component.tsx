
import React, { ReactNode, useContext } from 'react';
import IStoreItems from '../../interfaces/storeItems';
import ProductCard from '../product-card/product-card-component';
import { CategoriesContext } from '../../contexts/categories-contexts';
import IStoreProducts from '../../interfaces/products';
import './category-preview.styles.scss'
import { Link } from 'react-router-dom';


const SectionItemsPreview = (product: IStoreItems[]): ReactNode => {
    return product.reduce((acc: any, item) => {
        acc.length < 4
            ? acc.push(<ProductCard key={item.id} product={item} />)
            : acc
        return acc
    }, [])
}

const CategoryPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        <>
            {
                Object.keys(categoriesMap).map((title, id) => {
                    /**
                     * No index signature with a parameter of type 'string' was found on type.
                     * Using a type assertion to solve the error
                     * [title as keyof typeof categoriesMap] allows the const category to reference the categoriesMap[title]
                     * 
                     * */
                    const category: IStoreProducts['items'] = categoriesMap[title as keyof typeof categoriesMap]
                    return (
                        < div className='category-preview-container' key={id}>
                            <div >
                                <h2>
                                   <Link to={title}>
                                    <span className='title'>{title}</span>
                                   
                                   </Link>
                                </h2>
                                <div className='preview'>
                                    {
                                        SectionItemsPreview(category)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
}

export default CategoryPreview