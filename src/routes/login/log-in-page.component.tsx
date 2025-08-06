import SignUpForm from './sign-up/sign-up-form.component.tsx'
import SignIn from './sign-in/sign-in.components.tsx'
import { LoginPageContainer} from './log-in-page.styles'
import { Grid, } from '@radix-ui/themes'




const SignInPage = () => {
//gap='5' columns='2' width='auto' justify='end'

  return (
    <LoginPageContainer size='4'>
    <Grid gap='5' justify='center' width='auto' align='stretch'  columns='repeat(auto-fit, minmax(200px, 1fr))'>
    <SignIn />
    <SignUpForm />
    </Grid>
    
    </LoginPageContainer>
  )
}

export default SignInPage