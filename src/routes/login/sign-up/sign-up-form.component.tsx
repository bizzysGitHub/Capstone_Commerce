import { ChangeEvent, FormEvent, useState } from 'react'
import { handleNewUserWithEmailPassword } from '../../../utils/firebase/firebase';
import { FormInput } from '../../../components/form-input/form-input.component';
import Button from '../../../components/button/button.component';
import { LogInContainer} from '../log-in-page.styles'
import { useAppDispatch, } from '../../../app/hooks/custom';
import { updateUserDataFromSignUp } from '../../../features/user-information/usersSlice' 



/**
 * AS of Sep 3 im keeping this useEffect here for the displayname and the confirmPassword
 * I think once i update how this form works with react-form-hooks, I'll be able to check
 * validation of the passwords with zod and not need to keep state in this component. 
 * The email and the password are already in the userSlice, along with the returned data from firebase
 * 
 * Revisions will come soon
 */


type FormInfo = {
    displayName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const defaultValues = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {

    const [formValues, SetFormValues] = useState<FormInfo>(defaultValues);

    const { displayName, email, password, confirmPassword, } = formValues;
    const dispatch = useAppDispatch()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        SetFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('passwords do not match')
            SetFormValues({ ...formValues, ['password']: '', ['confirmPassword']: '' })
            return;
        }
        try {
            
            const userInfo = await handleNewUserWithEmailPassword(email, password, { displayName });
            dispatch(updateUserDataFromSignUp(userInfo))
            SetFormValues(defaultValues);

        } catch (error) {
            console.log(error);
            throw new Error("uh-ou email may be in use already")
            // error.code === 'auth/email-already-in-use' ? alert("uh-oh user already in use :(") : alert(error);
        }

    }
    return (
        <LogInContainer>
            <h2> Don't Have an Account?</h2>
            <span>Sign up with your email </span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    required
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleInputChange}
                />

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
                  <FormInput
                    label='Confirm Password'
                    required
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                />
               <Button type='submit'>Lets Get Started</Button>
            </form>
        </LogInContainer>
    )
}

export default SignUpForm