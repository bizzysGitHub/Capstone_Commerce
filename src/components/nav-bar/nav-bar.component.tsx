import { Outlet, Link } from 'react-router-dom'
import CrownLogo from '../../assets/crown.svg'
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink
} from './navigation.styles'

import CartIcon from '../cart-icon-container/cart-icon-component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component'
import { showDropdown } from '../../features/cart-items/cartItemSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks/custom'
import { RootState } from '../../app/store'
import { _signOutUser } from '../../features/user-information/usersSlice'



export default function Navbar() {
  const cart = useAppSelector((state: RootState) => state.cartItems)
  const userData = useAppSelector((state :RootState) => state.users.userDataFromFirebase)
  const dispatch = useAppDispatch()

  const handleSignOut = async () => {
    await dispatch(_signOutUser())
  }
  const handleDropdown = () => {
    dispatch(showDropdown())
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
        {cart.showDropdown && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}