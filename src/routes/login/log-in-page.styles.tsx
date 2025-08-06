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

export const SignInButton = styled(Button)`
letter-spacing: 0.5px;
    line-height: 50px;
    padding: 20px 0; 
    font-size: 15px;
    // background-color: black;
    color: white;
    // text-transform: uppercase;

    font-weight: bolder;
    cursor: pointer;
`