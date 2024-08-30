import { ChangeEvent, FormEvent } from 'react'
import Button from '../../../components/button/button.component'
import { FormInput } from '../../../components/form-input/form-input.component'
import { SignUpContainer } from '../log-in-page.styles'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/custom'
import { clearLoginForm, loginWithEmailAndPassword, loginWithGoogle, userLoginInputChange } from '../../../features/user-information/usersSlice'



const SignIn = () => {

    const userInfo = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const { email, password } = userInfo
   
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await dispatch(loginWithEmailAndPassword(userInfo))
        dispatch(clearLoginForm())
    }

    const googleLogin = async () => {

        await dispatch(loginWithGoogle())
        dispatch(clearLoginForm())

    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        dispatch(userLoginInputChange({ id: name, value }))


    }
    return (
        <SignUpContainer>
            <h2> I already have an account</h2>
            <span>Sign up with your email </span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />
                <FormInput
                    label='Password'
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between'
                }}>

                    <Button type='submit'>Sign In</Button>
                    <Button onClick={googleLogin} buttonType='google'> Google Sign In</Button>
                </div>
            </form>
        </SignUpContainer>

    )

}

export default SignIn