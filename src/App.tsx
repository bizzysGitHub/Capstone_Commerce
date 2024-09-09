// import { useState } from 'react'
import Navbar from './components/nav-bar/nav-bar.component'
import './index.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks/custom'
import { getCategories } from './features/categories/categorySlice'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page.tsx'
import SignInPage from './routes/login/log-in-page.component.tsx'
import Home from './routes/home/home.component.tsx'
import Shop from './routes/shop/shop.component.tsx'
import Checkout from './routes/checkout/checkout-component.tsx'
import Categories from './components/category/category.component.js'

function App() {
  const dispatch = useAppDispatch();

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,  
      element:<Navbar/>,
      loader: async () => {
      return   await dispatch(getCategories()).unwrap()
      },
      children: [
        {
          path: '/',
          element: <Home /> 

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




