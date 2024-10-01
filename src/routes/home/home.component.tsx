import Directory from '../../components/directory-container/directory-container.component';
import DirectoryItem from '../../components/directory-item/directory-item.component';
import { useAppSelector } from '../../app/hooks/custom'






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
  const DirectoryList  = () : JSX.Element[] => {

    if( isLoading ){

      return  [<h2> Loading</h2>]
    }
  
    return groupSortedHomePage.map((category) => (
      <DirectoryItem key={category.id} category={category} />
    ))
  }

  return (
    <Directory>
          <>
            {
              <DirectoryList />
            }
          </>
    </Directory>
  )
}