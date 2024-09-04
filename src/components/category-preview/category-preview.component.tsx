
import  { ReactNode } from 'react';
import IStoreItems from '../../interfaces/storeItems';
import ProductCard from '../product-card/product-card-component';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/custom';
 

const SectionItemsPreview = (products: IStoreItems[]): ReactNode[] => {

    const previewItemsArray = products.reduce((acc: ReactNode[], items: IStoreItems) => {
        acc.length < 4
            ? acc.push(<ProductCard key={items.id} product={items} />)
            : acc
        return acc
    }, [])
    return previewItemsArray
}

const CategoryPreview = () => {
    const categoryData = useAppSelector((state) => state.categories);
    const { categoriesMap } = categoryData;
    
    return (
        <>
            {
                Object.keys(categoriesMap).map((title: string, id: number) => {
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
                                        SectionItemsPreview(categoriesMap[title as keyof typeof categoriesMap])
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