import { useEffect } from 'react'
import { categories } from '../../home-categories'
import Directory from '../../components/directory-container/directory-container.component';
import DirectoryItem from '../../components/directory-item/directory-item.component';
import { useAppDispatch, useAppSelector } from '../../app/hooks/custom'
import { getCategories } from '../../features/categories/categorySlice'


export default function Home() {

  const dispatch = useAppDispatch()
  const categoryData = useAppSelector((state) => state.categories);
  const { isLoading, categoriesMap } = categoryData;

  const groupImagesThatNeedToBeUplaodedToFirebase = [
    "https://i.ibb.co/cvpntL1/hats.png",
    "https://i.ibb.co/px2tCc3/jackets.png",
    "https://i.ibb.co/0jqHpnp/sneakers.png",
    "https://i.ibb.co/GCCdy8t/womens.png",
    "https://i.ibb.co/R70vBrQ/men.png"
  ]


  useEffect(() => {
    const bringItTogether = async () => {
      await dispatch(getCategories()).unwrap()
    };


    bringItTogether()
  }, [dispatch])


  const sortedGroupsForTheHomePage = Object.keys(categoriesMap).map((item, id) => {
    return {
      id: id + 1,
      title: item,
      imageUrl: groupImagesThatNeedToBeUplaodedToFirebase[id]
    }
  })

  // console.log(sortedGroupsForTheHomePage);


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