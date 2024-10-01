// import { useState } from 'react'
import Navbar from './components/nav-bar/nav-bar.component'
import './index.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks/custom'
import { getCategories } from './features/categories/categorySlice'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page.tsx'
import SignInPage from './routes/login/log-in-page.component.tsx'
import Home from './routes/home/home.component.tsx'
import Shop from './routes/shop/shop.component.tsx'
import Checkout from './routes/checkout/checkout-component.tsx'
import Categories from './components/category/category.component.js'
// import { addFieldsAndDocuments } from '../src/utils/firebase/firebase.ts




function App() {
  const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.categories);

  // const categoryLoader = async () => {
  //   const { categoriesMap } = data;    
    
  //   if (Object.keys(categoriesMap).length === 0) {
  //     return await dispatch(getCategories()).unwrap()
  //   }
  //   return null
  // }


  useEffect(() => {
    const categoryLoader = async () => { 
     await dispatch(getCategories()).unwrap()
    };

    categoryLoader()
    
  }, [dispatch])
  

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <Navbar />,
      children: [
        {
          path: '/',
          element: <Home />,

        },
        {
          path: 'shop',
          element: <Shop />,

        },
        {
          path: 'shop/:product',
          element: <Categories />
        },
        {
          path: '/sign-in',
          element: <SignInPage />
        },
        {
          path: '/checkout',
          element: <Checkout />
        }
      ]

    }

  ])

  return (
    <>
      <RouterProvider router={router} />

    </>

  )
}

export default App




