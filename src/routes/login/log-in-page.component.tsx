import SignUpForm from './sign-up/sign-up-form.component'
import SignIn from './sign-in/sign-in.components'

const SignInPage = () => {
  return (
    <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', padding: '0.5rem' }}>
      <div className="auth-grid">
        <SignIn />
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignInPage
