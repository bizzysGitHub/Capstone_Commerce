import { ChangeEvent, FormEvent, useState } from 'react'
import { handleNewUserWithEmailPassword } from '../../../utils/firebase/firebase'
import { useAppDispatch } from '../../../app/hooks/custom'
import { updateUserDataFromSignUp } from '../../../features/user-information/usersSlice'
import { RdFormInput } from '@/components/form-input/form-input.component'

type FormInfo = {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

const defaultValues: FormInfo = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formValues, setFormValues] = useState<FormInfo>(defaultValues)
  const { displayName, email, password, confirmPassword } = formValues
  const dispatch = useAppDispatch()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      setFormValues({ ...formValues, password: '', confirmPassword: '' })
      return
    }

    try {
      const userInfo = await handleNewUserWithEmailPassword(email, password, { displayName })
      dispatch(updateUserDataFromSignUp(userInfo))
      setFormValues(defaultValues)
    } catch (error) {
      console.log(error)
      throw new Error("Email may already be in use")
    }
  }

  return (
    <section
      style={{
        width: '100%',
        padding: '1.65rem',
        border: '1px solid var(--panel-border)',
        borderRadius: 28,
        background: 'var(--panel-bg)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 48px var(--shadow-color)',
      }}
    >
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <h2 style={{ margin: 0, color: 'var(--accent-purple-strong)' }}>Create an account</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Sign up with your email to start shopping.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <RdFormInput
            label='Display Name'
            value={displayName}
            required
            type="text"
            name="displayName"
            onChange={handleInputChange}
            autoComplete="name"
          />
          <RdFormInput
            label='Email'
            required
            type="text"
            name="email"
            value={email}
            onChange={handleInputChange}
            autoComplete="email"
          />
          <RdFormInput
            label='Password'
            required
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          <RdFormInput
            label='Confirm Password'
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          <button
            type="submit"
            style={{
              marginTop: '0.5rem',
              width: '100%',
              border: 'none',
              borderRadius: 16,
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-deep))',
              color: '#22123d',
              padding: '0.9rem 1rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Lets Get Started
          </button>
        </form>
      </div>
    </section>
  )
}

export default SignUpForm
