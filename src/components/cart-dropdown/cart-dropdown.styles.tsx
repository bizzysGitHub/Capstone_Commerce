import styled from "styled-components";
// import Button from '../button/button.component'
import { Box, Card, DropdownMenu } from "@radix-ui/themes";

// testing switching from scss to styled components

export const CartItems = styled(DropdownMenu.Item)`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    // border: solid 1px var(--accent-7)

`;
export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`;



export const CartDropdownContainer = styled(Card)`
    // position: absolute;
    width: 240px;
    height: 330px;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border:solid 2px var(--accent-12);
    background-color: var(--accent-4);
    // top: 60px;
    // right: 50px;
    // z-index: 1;
    
    overflow: scroll
    
    

    ${'' /* ${Button} {
    margin-top: auto;
    } */}
`;

// .cart-dropdown-container {
//   position: absolute;
//   width: 240px;
//   height: 340px;
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   border: 1px solid black;
//   background-color: white;
//   top: 90px;
//   right: 40px;
//   z-index: 5;

// .empty-message {
//   font-size: 18px;
//   margin: 50px auto;
// }

// .cart-items {
//   height: 240px;
//   display: flex;
//   flex-direction: column;
//   overflow: scroll;
// }

//   button {
//     margin-top: auto;
//   }
// }
