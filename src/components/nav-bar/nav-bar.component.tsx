import React, { useContext, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import CrownLogo from '../../assets/crown.svg'
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink
} from './navigation.styles'

import { UserContext } from '../../contexts/users-contexts'
import { signOutUser } from '../../utils/firebase/firebase'
import CartIcon from '../cart-icon-container/cart-icon-component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component'
import { CartContext } from '../../contexts/cart-contexts'


export default function Navbar() {
  const { userData } = useContext(UserContext)
  const { showDropdown, setShowDropDown } = useContext(CartContext)
  const handleSignOut = async () => {
    await signOutUser()
  }
  const handleDropdown = () => {
    setShowDropDown(!showDropdown)
  }
  return (
    <>
      <NavigationContainer >
        <LogoContainer>
          <Link to={'/'}> <img src={CrownLogo} className='logo' alt="" /></Link>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to={'/shop'}> Shopping page</NavLink>
          <NavLink to={'/sign-in'}> {userData ? <span onClick={() => handleSignOut()}>Sign-out</span> : 'Sign In'}</NavLink>
          <CartIcon onClick={handleDropdown} />
        </NavLinksContainer>
        {showDropdown && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}