import SignUpForm from './sign-up/sign-up-form.component.tsx'
import SignIn from './sign-in/sign-in.components.tsx'
import { LoginPageContainer} from './log-in-page.styles'




const SignInPage = () => {

// const tempStyle : CSSProperties = {
//    display:'flex',
//     flexDirection:'row',
//     alignContent:'center',
//     justifyContent:'space-around',
//     margin: '30px auto',
//     width: '900px'
// }

  return (
    <LoginPageContainer>
    <SignIn />
    <SignUpForm />
    
    </LoginPageContainer>
  )
}

export default SignInPage