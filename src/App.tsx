// import { useState } from 'react'
import Navbar from './components/nav-bar/nav-bar.component'
import './index.scss'
import { UserProvider } from './contexts/users-contexts'
import { CategoriesProvider } from './contexts/categories-contexts'
import { CartProvider } from './contexts/cart-contexts'

function App() {


  return (
    <>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <Navbar />

          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </>

  )
}

export default App




