// import { useState } from 'react'
import Navbar from './components/nav-bar/nav-bar.component'
import './index.css'
import "@radix-ui/themes/styles.css";
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks/custom'
import { getCategories } from './features/categories/categorySlice'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ErrorPage from './ui/error-page.tsx'
import SignInPage from './routes/login/log-in-page.component.tsx'
import Home from './routes/home/home.component.tsx'
import Shop from './routes/shop/shop.component.tsx'
import Checkout from './routes/checkout/checkout-component.tsx'
import Categories from './components/category/category.component.js'
import Fallback from './ui/fall-back.tsx'
import { Box, Container, Theme } from '@radix-ui/themes';
// import { addFieldsAndDocuments } from '../src/utils/firebase/firebase.ts




function App() {
  const darkMode = useAppSelector((state) => state.users.darkMode)
  const dispatch = useAppDispatch();


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
      hydrateFallbackElement: <Fallback />,
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

    },

  ])
/**
 * {{ background: "var(--indigo-a9)", borderRadius: "var(--radius-3)" }}
 */
  return (
    <Theme 
    appearance={darkMode ? 'dark':'light'} 
    accentColor='jade'
    grayColor='sage' >
      <Box 
      minHeight='100vh' 
      style={{background: "var(--accent-5)" , borderRadius:"var(--radius-6)"}}>
        <Container size="4" >
      <RouterProvider
        router={router}
        />

        </Container>

      </Box>

    </Theme>

  )
}

export default App




