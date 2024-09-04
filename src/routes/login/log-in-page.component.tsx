import SignUpForm from './sign-up/sign-up-form.component.tsx'
import SignIn from './sign-in/sign-in.components.tsx'
import { LoginPageContainer} from './log-in-page.styles'




const SignInPage = () => {

  return (
    <LoginPageContainer>
    <SignIn />
    <SignUpForm />
    
    </LoginPageContainer>
  )
}

export default SignInPage