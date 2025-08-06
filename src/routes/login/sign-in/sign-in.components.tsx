import { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Box, Card, Flex, Heading, Text,Button, Grid } from '@radix-ui/themes'
import { FormInput } from '../../../components/form-input/form-input.component'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/custom'
import { clearLoginForm, loginWithEmailAndPassword, loginWithGoogle, userLoginInputChange } from '../../../features/user-information/usersSlice'
import { useNavigate } from 'react-router'
import { LogInContainer, MotionCard, SignInButton } from '../log-in-page.styles'


const SignIn = () => {

    const userInfo = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { email, password } = userInfo

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await dispatch(loginWithEmailAndPassword(userInfo))
        dispatch(clearLoginForm())
        navigate('/')
    }

    const googleLogin = async () => {
        await dispatch(loginWithGoogle())
        navigate('/')
        dispatch(clearLoginForm())

    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        dispatch(userLoginInputChange({ id: name, value }))

    }


    return (
        <LogInContainer >
            <MotionCard
                variant="surface"
                size='1'
                style={{ boxShadow: 'var(--shadow-4)' }}
                
                // animate={{ y: [0, -6, 0] }}
                // transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Flex align="center" direction="row" justify="center">
                    <Heading as="h2" size="8" m="5" align="center">
                        Sign In
                    </Heading>
                </Flex>
            </MotionCard>
            <Flex px='6' direction='column' align='center' >
                <form className='w-full' onSubmit={handleSubmit}>
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
                    <Grid gap='5' justify='center' align='center'  columns='repeat(auto-fill, minmax(150px,1fr))'>
                        <SignInButton variant="classic"  type='submit'>Sign In</SignInButton>
                        <Button onClick={googleLogin} color='blue' >Google Sign In</Button>
                        
                    </Grid>
                    {/* <Flex mb='5' gap="3" justify="center" wrap='wrap'>
                    </Flex> */}
                </form>
                    <Text asChild size={{xs:'2', sm:'5'}} mt='5'>
                        <a href='#'>
                            I already have an account
                        </a>
                    </Text>

            </Flex>
        </LogInContainer>
    )

}

export default SignIn