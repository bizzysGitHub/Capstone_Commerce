import { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Box, Card, Flex, Heading, Text, Button, Grid } from '@radix-ui/themes'
import { RdFormInput } from '../../../components/form-input/form-input.component'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/custom'
import { clearLoginForm, loginWithEmailAndPassword, loginWithGoogle, userLoginInputChange } from '../../../features/user-information/usersSlice'
import { useNavigate } from 'react-router'
import { FaceBookButton, GoogleButton, LogInContainer, MotionCard, SignInButton } from '../log-in-page.styles'
import GoogleLogo from '@/assets/google.svg?react'
import FacebookLogo from '@/assets/facebook.svg?react'
import CapstoneLogo from '@/assets/CapstoneLogo.svg'

const SignIn = () => {

    const userInfo = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { email, password, darkMode } = userInfo

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
        <LogInContainer>
            <Flex px="6" direction="column" align="center">
                <img
                    src={CapstoneLogo}
                    alt="Capstone Logo"
                    width="200px"
                />
                <Heading as="h2"
                    size={{ xs: "2", sm: "5" }}
                    weight="light"
                    align="center"
                    color='gray' >
                    Welcome back — sign in below
                </Heading>
                <form className="w-full" onSubmit={handleSubmit}>
                    <RdFormInput
                        label="Email"
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        variant="classic"
                        color="jade"
                        RdLabelProps={{ color: 'jade' }}
                    />
                    <RdFormInput
                        label="Password"
                        required
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        variant="classic"
                        color="jade"
                        RdLabelProps={{ color: 'jade' }}
                    />
                    <Box style={{ width: '100%' }} mb="5">
                        <SignInButton
                            variant={darkMode ? "soft" : "outline"}
                            type="submit"
                            highContrast
                        >
                            Sign In
                        </SignInButton>
                    </Box>
                </form>
                <Flex align="center" justify="center" mb="5" width="100%">
                    <Box my="0"
                        style={{
                            height: '1px',
                            flexGrow: 1,
                            backgroundColor: 'var(--gray-7)',
                        }}
                    />
                    <Text size="2" color="gray" className='px-3'>
                        or sign in with
                    </Text>
                    <Box
                        style={{
                            height: '1px',
                            flexGrow: 1,
                            backgroundColor: 'var(--gray-7)',
                        }}
                    />
                </Flex>
                <Flex
                    width="100%"
                    gap="2"
                    align="center"
                    justify="center"
                    direction={{ initial: 'column', sm: 'row' }}
                >
                    <GoogleButton
                        onClick={googleLogin}
                        color="gray"
                        highContrast
                    >
                        <Flex align="center" gap="2">
                            <GoogleLogo />
                            Google
                        </Flex>
                    </GoogleButton>
                    <FaceBookButton
                    disabled
                        onClick={googleLogin}
                        color="indigo"
                    >
                        <Flex align="center" gap="2">
                            <FacebookLogo />
                            Facebook
                        </Flex>
                    </FaceBookButton>
                </Flex>



                {/* </Grid> */}
            </Flex>
        </LogInContainer>
    )

}

export default SignIn