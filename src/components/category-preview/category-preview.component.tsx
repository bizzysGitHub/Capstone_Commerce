import { ReactElement, useMemo } from 'react';
import ProductCard from '../product-card/product-card-component';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles'
import { Link } from 'react-router';
import { useAppSelector } from '../../app/hooks/custom';
import { CategoryData, CategoryItem, CategoryMap } from '@/utils/types';

const SectionItemsPreview = (products: CategoryItem[]): ReactElement[] =>
    products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
    ));

const CategoryPreview = () => {
    const categoryData = useAppSelector((state) => state.categories);
    const { categoriesMap } = categoryData;
        return (
        <>
            {
                categoriesMap.map((productObject: CategoryMap, id: number) => {
                    const [title, data] = Object.entries(productObject)[0];

                    return (
                        <CategoryPreviewContainer key={id}>
                            <h2>
                                <Link to={title}>
                                    <Title>{title}</Title>
                                </Link>
                            </h2>
                            <Preview>{SectionItemsPreview(data.items)}</Preview>
                        </CategoryPreviewContainer>
                    );
                })
            }
        </>
    )
}

export default CategoryPreview