import React, { useContext, useState } from 'react'
import { Outlet, Link } from 'react-router-dom' 
import CrownLogo from '../../assets/crown.svg'
import './navigation.styles.scss'

import { UserContext } from '../../contexts/users-contexts'
import { signOutUser}  from '../../utils/firebase/firebase'
import CartIcon from '../cart-icon-container/cart-icon-component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component'
import { CartContext } from '../../contexts/cart-contexts'


export default function Navbar () {
  const {userData} = useContext(UserContext)
  const {showDropdown, setShowDropDown} = useContext(CartContext)
  const handleSignOut = async () => { 
    await signOutUser()
  } 
  const handleDropdown = () => {
    setShowDropDown(!showDropdown)
  }
  return (
    <>
    <div className='navigation'>
        <div className='logo-container'>
        <Link to={'/'}> <img src={CrownLogo} className='logo' alt="" /></Link>
        </div>
        <div className='nav-links-container'>
        <Link className='nav-link' to={'/shop'}> Shopping page</Link>
        <Link className='nav-link' to={'/sign-in'}> {userData ? <span onClick={() => handleSignOut()}>Sign-out</span> : 'Sign In'}</Link>
        <CartIcon onClick={handleDropdown}/>
        </div>
        {showDropdown && <CartDropdown/>}
    </div>
    <Outlet/>
    </>
  )
}