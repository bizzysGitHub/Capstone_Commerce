import CrownLogo from '../../assets/crown.svg'
import { Outlet, Link } from 'react-router'
import CartIcon from '../cart-icon-container/cart-icon-component'
import CartDropdown from '../cart-dropdown/cart-dropdown-component'
import { showDropdown } from '../../features/cart-items/cartItemSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks/custom'
import { RootState } from '../../redux/store'
import { _signOutUser, setDarkModeOn } from '../../features/user-information/usersSlice'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2V5M12 19V22M22 12H19M5 12H2M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07M19.07 19.07L16.95 16.95M7.05 7.05L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
)

export default function Navbar() {
  const cart = useAppSelector((state: RootState) => state.cartItems)
  const user = useAppSelector((state: RootState) => state.users)
  const dispatch = useAppDispatch()
  const userData = user.userDataFromFirebase
  const darkMode = user.darkMode

  const handleSignOut = async () => {
    await dispatch(_signOutUser())
  }

  const handleDropdown = () => {
    dispatch(showDropdown())
  }

  const toggleTheme = () => {
    dispatch(setDarkModeOn())
  }

  return (
    <div style={{ display: 'grid', gap: '1rem', width: '100%', maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 50 }}>
      <nav
        style={{
          position: 'relative',
          zIndex: 60,
          overflow: 'visible',
          minHeight: 78,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem 1.25rem',
          border: '1px solid var(--panel-border)',
          borderRadius: 28,
          background: 'var(--panel-bg)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 22px 56px var(--shadow-color)',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <img src={CrownLogo} alt="Crown logo" width={48} height={48} />
          <div style={{ display: 'grid', gap: '0.1rem' }}>
            <strong style={{ color: 'var(--accent-purple-strong)', letterSpacing: '0.06em' }}>CROWN SHOP</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>Purple. Gold. Clean checkout.</span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: 'auto', flexWrap: 'wrap', position: 'relative' }}>
          <Link
            to="/shop"
            style={{
              textDecoration: 'none',
              color: 'var(--text-primary)',
              fontWeight: 700,
              padding: '0.55rem 0.95rem',
              borderRadius: 999,
              background: 'rgba(253, 185, 39, 0.18)',
            }}
          >
            Shopping Page
          </Link>
          <Link
            to="/sign-in"
            style={{
              textDecoration: 'none',
              color: 'var(--text-primary)',
              fontWeight: 700,
              padding: '0.55rem 0.95rem',
              borderRadius: 999,
              background: 'rgba(85, 37, 131, 0.16)',
            }}
          >
            <span onClick={userData ? handleSignOut : undefined}>
              {userData ? 'Sign Out' : 'Sign In'}
            </span>
          </Link>
          <CartIcon onClick={handleDropdown} />
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              width: 42,
              height: 42,
              display: 'grid',
              placeItems: 'center',
              border: '1px solid var(--panel-border)',
              borderRadius: 999,
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-purple))',
              color: 'var(--text-contrast)',
              cursor: 'pointer',
              boxShadow: '0 10px 26px var(--shadow-color)',
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        {cart.showDropdown && <CartDropdown />}
      </nav>
      <Outlet />
    </div>
  )
}
