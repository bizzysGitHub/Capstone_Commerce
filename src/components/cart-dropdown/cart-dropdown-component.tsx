
import CartItem from '../cart-item/cart-item-component';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks/custom';
import { showDropdown } from '../../features/cart-items/cartItemSlice';
import { CartState } from '@/utils/types/category';
import { Button, Card, DropdownMenu } from '@radix-ui/themes';
import styled from 'styled-components';


const CartDropdown = () => {

  const navigate = useNavigate();
  // const cart = useRef<null | HTMLDivElement>(null)  //remove this later after we remember what we wrote it for

  const reduxCart = useAppSelector((state: { cartItems: CartState }) => state.cartItems);
  const dispatch = useAppDispatch();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
    dispatch(showDropdown())
  }


  return (
    <CartDropdownContainer variant='ghost'>
      <CartItems
      // ref={cart}
      >
        {
          reduxCart.itemsInCart.length < 1
            ? <EmptyMessage> No items in your cart</EmptyMessage>
            : reduxCart.itemsInCart.map((item: any) => (<CartItem item={item} key={item.id} />))
        }


      </CartItems>
      <Button
        style={{ color: "var(--accent-6)", backgroundColor: "var(--accent-12)" }}
        mt={"4"}
        onClick={goToCheckoutHandler}
      >Go To Checkout</Button>
    </CartDropdownContainer>
  )
};

export default CartDropdown

const CartItems = styled(DropdownMenu.Item)`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    // border: solid 1px var(--accent-7)

`;
const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`;



const CartDropdownContainer = styled(Card)`
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