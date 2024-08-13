// import { useState } from 'react'
import Navbar from './components/nav-bar/nav-bar.component'
import './index.scss'
import { UserProvider } from './contexts/users-contexts'
import { CategoriesProvider } from './contexts/categories-contexts'
import { useEffect } from 'react'
import {  useAppDispatch } from './app/hooks/custom'
import { getCategories } from './features/categories/categorySlice'

function App() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    // setCategory(allProducts)
    const loadingShouldBeDifferent = async () => {
      await dispatch(getCategories()).unwrap()
    }
    loadingShouldBeDifferent()

  }, [dispatch])

  return (
    <>
      <UserProvider>
        <CategoriesProvider>
            <Navbar />
        </CategoriesProvider>
      </UserProvider>
    </>

  )
}

export default App




