import Directory from '../../components/directory-container/directory-container.component';
import DirectoryItem from '../../components/directory-item/directory-item.component';
import { useAppSelector } from '../../app/hooks/custom'


export default function Home() {

  const categoryData = useAppSelector((state) => state.categories);
  const { isLoading, categoriesGroupImage } = categoryData;


  const sortedGroupsForTheHomePage = Object.keys(categoriesGroupImage).map((item, id) => {
    return {
      id: id + 1,
      title: item,
      imageUrl: categoriesGroupImage[item as keyof typeof categoriesGroupImage]
    }
  })


  return (
    <Directory>
      {
        isLoading ? <>
          <h2> one sec bizz we loading </h2>
        </> :
          <>
            {
              sortedGroupsForTheHomePage.map((category) => (
                <DirectoryItem key={category.id} category={category} />
              ))

            }
          </>

      }
    </Directory>
  )
}