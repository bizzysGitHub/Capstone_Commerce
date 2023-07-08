import { ChangeEvent, FormEvent, useState } from 'react'
import { handleNewUserWithEmailPassword } from '../../../utils/firebase/firebase';
import { FormInput } from '../../../components/form-input/form-input.component';
import '../log-in-page.styles.scss'
import Button from '../../../components/button/button.component';



interface FormInfo {
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        SetFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("passwords do not match")
            SetFormValues({ ...formValues, ['password']: '', ['confirmPassword']: '' })
            return;
        }
        try {

            await handleNewUserWithEmailPassword(email, password, { displayName });
            SetFormValues(defaultValues);

        } catch (error: any) {
            error.code === 'auth/email-already-in-use' ? alert("uh-oh user already in use :(") : alert(error);
        }

    }
    return (
        <div className='sign-up-container'>
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
        </div>
    )
}

export default SignUpForm