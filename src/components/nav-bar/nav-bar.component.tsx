import CrownLogo from '../../assets/crown.svg'
import CapstoneLogo from '@/assets/CapstoneLogo.svg'
import { Outlet, Link } from 'react-router'
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink
} from './navigation.styles'

import CartIcon from '../cart-icon-container/cart-icon-component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component'
import { showDropdown, emptyCart } from '../../features/cart-items/cartItemSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks/custom'
import { RootState } from '../../redux/store'
import { _signOutUser, setDarkModeOn } from '../../features/user-information/usersSlice'
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { IconButton } from '@radix-ui/themes'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";




export default function Navbar() {
  const cart = useAppSelector((state: RootState) => state.cartItems)
  const { userDataFromFirebase, darkMode } = useAppSelector((state: RootState) => state.users)
  const dispatch = useAppDispatch();
  // const userData = useAppSelector((state :RootState) => state.users.userDataFromFirebase)
  // const userData = user.userDataFromFirebase
  // const darkMode = user.darkMode

  const handleSignOut = async () => {
    await dispatch(_signOutUser())
  }
  // const handleDropdown = () => {
  //   dispatch(showDropdown())
  // }
  const setDarkMode = () => {
    dispatch(setDarkModeOn())
  }
  return (
    <>
      <NavigationContainer >
        <LogoContainer>
          <Link to={'/'}> <img src={CrownLogo} className='logo' alt="" /></Link>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to={'/shop'}> Shopping page</NavLink>
          <NavLink to={'/sign-in'}> {userDataFromFirebase ? <span onClick={() => handleSignOut()}>Sign-out</span> : 'Sign In'}</NavLink>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button" className="bg-transparent border-none">
                <CartIcon />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.DropdownMenuContent
              side="bottom"
              align="end"
              sideOffset={8}
              style={{ backgroundColor: 'var(--accent-3) ' }}
              className="rounded-md shadow-md p-2 z-50">
              <CartDropdown />
            </DropdownMenu.DropdownMenuContent>
            {/* {cart.showDropdown && <CartDropdown />} */}
          </DropdownMenu.Root>
          <IconButton
            variant='ghost'
            onClick={setDarkMode}
            radius='full'
            color='gray'
            m="2"
          >
            {darkMode ? <SunIcon color='gold' width="18" height="18" className='cursor-pointer' /> : <MoonIcon color='gray' width="18" height="18" className='cursor-pointer' />}
          </IconButton>
        </NavLinksContainer>
      </NavigationContainer>
      <Outlet />
    </>
  )
}