import { useEffect, useMemo } from 'react'
import { User } from 'firebase/auth'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { TamaguiProvider, Theme } from 'tamagui'
import { useAppDispatch, useAppSelector } from './app/hooks/custom'
import Navbar from './components/nav-bar/nav-bar.component'
import Categories from './components/category/category.component'
import ProtectedRoute from './components/protected-route/protected-route.component'
import { getCategories } from './features/categories/categorySlice'
import { setAuthResolved, setUserSession } from './features/user-information/usersSlice'
import Home from './routes/home/home.component'
import SignInPage from './routes/login/log-in-page.component'
import { Checkout } from './routes/checkout/checkout-component'
import Shop from './routes/shop/shop.component'
import Fallback from './ui/fall-back'
import ErrorPage from './ui/error-page'
import { getDocFromUserAuth, onAuthStateChangeListener } from './utils/firebase/firebase'
import './index.css'
import tamaguiConfig from '../tamagui.config'

function App() {
  const { darkMode } = useAppSelector((state) => state.users)
  const categoriesCount = useAppSelector((state) => state.categories.categoriesMap.length)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthResolved(false))

    const unsubscribe = onAuthStateChangeListener(async (userAuth: User | null) => {
      try {
        if (userAuth) {
          const userData = await getDocFromUserAuth(userAuth)
          dispatch(setUserSession(userData ?? null))
          return
        }

        dispatch(setUserSession(null))
      } catch (error) {
        console.error(error)
        dispatch(setUserSession(null))
      }
    })

    return unsubscribe
  }, [dispatch])

  useEffect(() => {
    if (categoriesCount > 0) {
      return
    }

    const categoryLoader = async () => {
      await dispatch(getCategories()).unwrap()
    }

    categoryLoader()
  }, [categoriesCount, dispatch])

  const router = useMemo(
    () =>
      createBrowserRouter([
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
              element: <Categories />,
            },
            {
              path: '/sign-in',
              element: <SignInPage />,
            },
            {
              path: '/checkout',
              element: (
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ]),
    []
  )

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={darkMode ? 'dark' : 'light'}>
      <Theme name={darkMode ? 'dark' : 'light'}>
        <div
          style={{
            minHeight: '100vh',
            padding: '1rem',
            background: darkMode
              ? 'radial-gradient(circle at top, #6f2dbd 0%, #1a1038 38%, #090909 100%)'
              : 'linear-gradient(180deg, #fff7d1 0%, #f4e2ff 52%, #ffffff 100%)',
            color: darkMode ? '#ffffff' : '#1b1230',
            ['--page-bg' as string]: darkMode
              ? 'radial-gradient(circle at top, #6f2dbd 0%, #1a1038 38%, #090909 100%)'
              : 'linear-gradient(180deg, #fff7d1 0%, #f4e2ff 52%, #ffffff 100%)',
            ['--panel-bg' as string]: darkMode ? 'rgba(21, 10, 43, 0.86)' : 'rgba(255, 255, 255, 0.9)',
            ['--panel-bg-strong' as string]: darkMode ? 'rgba(12, 7, 25, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            ['--panel-border' as string]: darkMode ? 'rgba(253, 185, 39, 0.35)' : 'rgba(85, 37, 131, 0.24)',
            ['--text-primary' as string]: darkMode ? '#ffffff' : '#22123d',
            ['--text-muted' as string]: darkMode ? '#e6d7ff' : '#5b4b78',
            ['--text-contrast' as string]: darkMode ? '#0d0d0d' : '#ffffff',
            ['--accent-purple' as string]: '#552583',
            ['--accent-purple-strong' as string]: darkMode ? '#7d47b7' : '#552583',
            ['--accent-gold' as string]: '#fdb927',
            ['--accent-gold-deep' as string]: '#d4a017',
            ['--shadow-color' as string]: darkMode ? 'rgba(0, 0, 0, 0.42)' : 'rgba(85, 37, 131, 0.18)',
          }}
        >
          <RouterProvider router={router} />
        </div>
      </Theme>
    </TamaguiProvider>
  )
}

export default App
