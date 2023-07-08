import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { loginWithGooglePopup, signUserInWithEmailAndPassword } from '../../../utils/firebase/firebase'
import Button from '../../../components/button/button.component'
import { FormInput } from '../../../components/form-input/form-input.component'
import { UserContext } from '../../../contexts/users-contexts'


// type signInProps = { 
//     children:ReactNode
// }


interface FormInfo {
    email: string,
    password: string,
}

const defaultValues = {
    email: "",
    password: "",
}


const SignIn = () => {
    const { setUserData } = useContext(UserContext)


    const [formValues, SetFormValues] = useState<FormInfo>(defaultValues);

    const { email, password } = formValues;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const userInfoFromFirebase = await signUserInWithEmailAndPassword(email, password);

            if (userInfoFromFirebase) {
                setUserData(userInfoFromFirebase)
            }
            SetFormValues(defaultValues);

        } catch (error: any) {
            error.code === 'auth/email-already-in-use'
                ? alert("uh-oh user already in use :(")
                : alert(error);
        }
    }

    const googleLogin = async () => {

        try {
            const userInfoFromFirebase = await loginWithGooglePopup()
            if (userInfoFromFirebase) {
                setUserData(userInfoFromFirebase)
            }
        } catch (error: unknown) {
            //     error.code === 'auth/email-already-in-use' 
            //     ? alert("uh-oh user already in use :(") 
            alert(error);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        SetFormValues({ ...formValues, [name]: value })


    }
    return (
        <div className='sign-up-container'>
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
        </div>

    )

}

export default SignIn