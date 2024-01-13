
import React, { ReactNode, useContext } from 'react';
import IStoreItems from '../../interfaces/storeItems';
import ProductCard from '../product-card/product-card-component';
import { CategoriesContext } from '../../contexts/categories-contexts';
import IStoreProducts from '../../interfaces/products';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles'
import { Link } from 'react-router-dom';


//IStoreProducts['items']
//categoriesMap[title as keyof typeof categoriesMap]



const SectionItemsPreview = (products: IStoreProducts[] | IStoreItems): ReactNode[] => {

    const previewItemsArray = Object.values(products)
        .map((itemsArray): ReactNode[] => {
            return itemsArray.reduce((acc: ReactNode[], items: IStoreItems) => {
                acc.length < 4
                    ? acc.push(<ProductCard key={items.id} product={items} />)
                    : acc
                return acc
            }, [])
        });
    return previewItemsArray;

}

const CategoryPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    const category = categoriesMap
    return (
        <>
            {
                Object.keys(categoriesMap).map((title, id) => {
                    return (
                        <CategoryPreviewContainer key={id}>
                            <div>
                                <h2>
                                    <Link to={title}>
                                        <Title>
                                            {title}
                                        </Title>
                                    </Link>
                                </h2>
                                <Preview>

                                    {
                                        SectionItemsPreview(category)
                                    }
                                </Preview>
                            </div>
                        </CategoryPreviewContainer>
                    )
                })

            }

        </>
    )
}

export default CategoryPreview