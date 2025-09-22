import React, { JSX, Suspense } from 'react';
import { Container, Grid, Box } from '@radix-ui/themes';
import DirectoryItem from '../../components/directory-item/directory-item.component';
import { useAppSelector } from '../../app/hooks/custom';
import Fallback from '../../ui/fall-back';

const DirectoryList = ({ categories }: { categories: Array<{id: number, title: string, imageUrl: string}> }): JSX.Element => (
  <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
    {categories.map((category) => (
      <DirectoryItem key={category.id} category={category} />
    ))}
  </Grid>
);

export default function Home() {
  const { isLoading, categoriesMap } = useAppSelector((state) => state.categories);

  const groupSortedHomePage = categoriesMap.map((item, index) => {
    const itemName = Object.keys(item)[0];
    return {
      id: index + 1,
      title: itemName,
      imageUrl: item[itemName].previewImg
    };
  });

  return (
    <Container size="4" p="4">
      <Box>
        <Suspense fallback={<Fallback />}>
          {isLoading ? (
            <Fallback />
          ) : (
            <DirectoryList categories={groupSortedHomePage} />
          )}
        </Suspense>
      </Box>
    </Container>
  );
}