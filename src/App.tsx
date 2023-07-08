// import { useState } from 'react'
import Navbar from './components/nav-bar/nav-bar.component'
import './index.scss'
import { UserProvider } from './contexts/users-contexts'
import { ProductsProvider } from './contexts/products-contexts'
import { CartProvider } from './contexts/cart-contexts'

function App() {


  return (
    <>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <Navbar />

          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </>

  )
}

export default App




