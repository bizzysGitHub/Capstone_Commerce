import { ChangeEvent, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { RdFormInput } from '../../../components/form-input/form-input.component'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/custom'
import { loginWithEmailAndPassword, loginWithGoogle, userLoginInputChange } from '../../../features/user-information/usersSlice'
import GoogleLogo from '@/assets/google.svg?react'
import FacebookLogo from '@/assets/facebook.svg?react'
import CapstoneLogo from '@/assets/CapstoneLogo.svg'

const cardStyle = {
  width: '100%',
  padding: '1.65rem',
  border: '1px solid var(--panel-border)',
  borderRadius: 28,
  background: 'var(--panel-bg)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 20px 48px var(--shadow-color)',
} as const

const SignIn = () => {
  const { users } = useAppSelector((state) => state)
  const { email, password, userDataFromFirebase } = users
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userDataFromFirebase !== null) {
      navigate('/checkout', { replace: true })
    }
  }, [navigate, userDataFromFirebase])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(loginWithEmailAndPassword(users))
  }

  const googleLogin = async () => {
    await dispatch(loginWithGoogle())
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(userLoginInputChange({ id: name, value }))
  }

  return (
    <section style={cardStyle}>
      <div style={{ display: 'grid', gap: '1rem', alignItems: 'center' }}>
        <img src={CapstoneLogo} alt="Capstone Logo" width="200" style={{ justifySelf: 'center' }} />
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <h2 style={{ margin: 0, color: 'var(--accent-purple-strong)' }}>Welcome back</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Sign in below to continue to checkout.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <RdFormInput
            label="Email"
            required
            type="text"
            name="email"
            value={email}
            onChange={handleInputChange}
            autoComplete="email"
          />
          <RdFormInput
            label="Password"
            required
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
          <button
            type="submit"
            style={{
              marginTop: '0.5rem',
              width: '100%',
              border: 'none',
              borderRadius: 16,
              background: 'linear-gradient(135deg, var(--accent-purple), #7b3fc3)',
              color: '#fff',
              padding: '0.9rem 1rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--panel-border)' }} />
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>or sign in with</p>
          <div style={{ flex: 1, height: 1, background: 'var(--panel-border)' }} />
        </div>

        <div style={{ display: 'flex', width: '100%', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={googleLogin}
            style={{
              flex: 1,
              minWidth: 160,
              border: 'none',
              borderRadius: 16,
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-deep))',
              color: '#22123d',
              padding: '0.9rem 1rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <GoogleLogo />
              Google
            </span>
          </button>
          <button
            type="button"
            disabled
            style={{
              flex: 1,
              minWidth: 160,
              border: 'none',
              borderRadius: 16,
              background: 'rgba(85, 37, 131, 0.35)',
              color: '#fff',
              padding: '0.9rem 1rem',
              fontWeight: 700,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FacebookLogo />
              Facebook
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default SignIn
