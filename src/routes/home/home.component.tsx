import Directory from '../../components/directory-container/directory-container.component';
import DirectoryItem from '../../components/directory-item/directory-item.component';
import { useAppSelector } from '../../app/hooks/custom'
import Fallback from '../../ui/fall-back';
import { Suspense } from 'react';






export default function Home() {

  const categoryData = useAppSelector((state) => state.categories);
  const { isLoading, categoriesMap } = categoryData;

  const groupSortedHomePage = categoriesMap.map((item, index) => {
    const itemName = Object.keys(item)[0]
    return {
      id: index + 1,
      title: itemName,
      imageUrl: item[itemName].previewImg
    }

  })

  const DirectoryList = (): JSX.Element => {
    return <>
      {groupSortedHomePage.map((category) => (<DirectoryItem key={category.id} category={category} />))}
    </>
  }

  return (
    <Directory>
      {isLoading ? <Fallback /> : <DirectoryList />}
    </Directory>

  )
}