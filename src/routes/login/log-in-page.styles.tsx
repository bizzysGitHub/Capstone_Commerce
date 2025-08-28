import { Box, Button, Card, Container, Flex, } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components
export const LogInContainer = styled(Card)`
  // border: solid 3px goldenrod ;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width:100%;


`;
export const MotionCard = motion.create(Card)

export const LoginPageContainer = styled(Container)`
// border: solid 4px gold
`;

export const BaseButton = styled(Button)`
letter-spacing: 0.5px;
font-weight: bolder;

line-height: 50px;
font-size: 15px;

&:hover:not(:disabled){
  cursor: pointer
  }
`

export const SignInButton = styled(BaseButton)`
    width: 100%   
`
export const GoogleButton = styled(BaseButton)`
    width: 100% ;
    flex:1  
`
export const FaceBookButton = styled(BaseButton)`
  width: 100%  ;
  flex: 1 
`
export const SignUpButton = styled(BaseButton)`
  width: 100%   
`
