import Directory from '../../components/directory-container/directory-container.component';
import DirectoryItem from '../../components/directory-item/directory-item.component';
import { useAppSelector } from '../../app/hooks/custom'
import Fallback from '../../ui/fall-back';
import { Suspense } from 'react';






export default function Home() {

  const categoryData = useAppSelector((state) => state.categories);
  // const categoryData  = useLoaderData() 
  const { isLoading, categoriesGroupImage } = categoryData;

  const groupSortedHomePage = Object.keys(categoriesGroupImage).map((item, id) => {
    return {
      id: id + 1,
      title: item,
      imageUrl: categoriesGroupImage[item as keyof typeof categoriesGroupImage]
    }
  })
  const DirectoryList = (): JSX.Element => {
    return <>
      {groupSortedHomePage.map((category) => (<DirectoryItem key={category.id} category={category} />))}
    </>
  } 

  return (
      <Directory>
       {isLoading ? <Fallback/> : <DirectoryList />} 
      </Directory>

  )
}