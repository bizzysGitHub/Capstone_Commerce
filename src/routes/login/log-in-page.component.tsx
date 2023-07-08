import React, { CSSProperties, ChangeEvent } from 'react'
import SignUpForm from './sign-up/sign-up-form.component.tsx'
import SignIn from './sign-in/sign-in.components.tsx'
import './log-in-page.styles.scss'




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
    <div className='login-page-container'>
    <SignIn />
    <SignUpForm />
    
    </div>
  )
}

export default SignInPage