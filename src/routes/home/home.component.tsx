import { Suspense } from 'react';
import DirectoryItem from '../../components/directory-item/directory-item.component';
import { useAppSelector } from '../../app/hooks/custom';
import Fallback from '../../ui/fall-back';
import Directory from '../../components/directory-container/directory-container.component';

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
    <div style={{ padding: '0.5rem', width: '100%', maxWidth: 1240, margin: '0 auto' }}>
      <Suspense fallback={<Fallback />}>
        {isLoading ? (
          <Fallback />
        ) : (
          <Directory>
            {groupSortedHomePage.map((category) => (
              <DirectoryItem key={category.id} category={category} />
            ))}
          </Directory>
        )}
      </Suspense>
    </div>
  );
}
