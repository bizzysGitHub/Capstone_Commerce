import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page.tsx'
import SignInPage from './routes/login/log-in-page.component.tsx'
import Home from './routes/home/home.component.tsx'
// import Navbar from './components/nav-bar/nav-bar.component.tsx'
import Shop from './routes/shop/shop.component.tsx'
import Checkout from './routes/checkout/checkout-component.tsx'
// import Categories from './components/categories/categories.component.jsx'
import Categories from './components/category/category.component.js'

//{ type }: { type: string }



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
