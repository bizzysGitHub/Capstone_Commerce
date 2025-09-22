import { ChangeEvent, FormEvent, useState } from 'react'
import { handleNewUserWithEmailPassword } from '../../../utils/firebase/firebase';
import Button from '../../../components/button/button.component';
import { BaseButton, LogInContainer, SignUpButton } from '../log-in-page.styles'
import { useAppDispatch, useAppSelector, } from '../../../app/hooks/custom';
import { updateUserDataFromSignUp } from '../../../features/user-information/usersSlice'
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { RdFormInput } from '@/components/form-input/form-input.component'


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

    const darkMode = useAppSelector((state) => state.users.darkMode);

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
            <Flex px="6" direction="column" align="center" justify="between" >
                <Heading
                    as="h1"
                    my="4"
                    size={{ xs: "2", sm: "6" }}
                    weight="bold"
                    align="center" >
                    Don't Have an Account?
                </Heading>
                <Heading
                    size={{ xs: "2", sm: "4" }}
                    weight="light"
                    align="center"
                    color='gray'
                    as='h2'

                > Sign up with your email </Heading>

                <form
                    className="w-full"
                    onSubmit={handleSubmit}>
                    {/* <FormInput
                        label='Display Name'
                        required
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={handleInputChange}
                    /> */}
                    <RdFormInput
                        label='Display Name'
                        value={displayName}
                        required
                        type="text"
                        name="displayName"
                        onChange={handleInputChange}
                        variant="classic"
                        color='jade'
                        RdLabelProps={{
                            color: 'jade'
                        }}
                    />
                    <RdFormInput
                        label='Email'
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        variant="classic"
                        color='jade'
                        RdLabelProps={{ color: 'jade' }}
                    />
                    <RdFormInput
                        label='Password'
                        required
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        variant="classic"
                        color='jade'
                        RdLabelProps={{ color: 'jade' }}
                    />
                    <RdFormInput
                        label='Confirm Password'
                        required
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        variant="classic"
                        color='jade'
                        RdLabelProps={{ color: 'jade' }}
                    />
                    <SignUpButton variant={darkMode ? "soft" : "outline"}
                        type="submit"
                        highContrast
                        mb="5" >Lets Get Started</SignUpButton>
                </form>
            </Flex>
        </LogInContainer>
    )
}

export default SignUpForm