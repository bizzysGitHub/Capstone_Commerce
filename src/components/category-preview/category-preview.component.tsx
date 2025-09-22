import { ReactElement } from 'react';
import ProductCard from '../product-card/product-card-component';
import { Link } from 'react-router';
import { useAppSelector } from '../../app/hooks/custom';
import { CategoryItem, CategoryMap } from '@/utils/types';
import { Box, Container, Heading, Flex } from '@radix-ui/themes';

const SectionItemsPreview = (products: CategoryItem[]): ReactElement[] =>
    products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
    ));

const CategoryPreview = () => {
    const { categoriesMap } = useAppSelector((state) => state.categories);

    return (
        <Container size="4">
            {categoriesMap.map((productObject: CategoryMap, id: number) => {
                const [title, data] = Object.entries(productObject)[0];

                return (
                    <Box key={id} mb="6">
                        <Link to={title} style={{ textDecoration: 'none' }}>
                            <Heading 
                                size="6" 
                                mb="4" 
                                color="jade" 
                                weight="medium"
                            >
                                {title.toUpperCase()}
                            </Heading>
                        </Link>
                        <Flex gap="4" wrap="wrap">
                            {SectionItemsPreview(data.items)}
                        </Flex>
                    </Box>
                );
            })}
        </Container>
    );
};

export default CategoryPreview;