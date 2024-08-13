import { useRef } from 'react'
import Button from '../button/button.component'
import {CartItems, EmptyMessage, CartDropdownContainer} from'./cart-dropdown.styles'
import CartItem from '../cart-item/cart-item-component';
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks/custom';
import { showDropdown } from '../../features/cart-items/cartItemSlice'; 
import CartState from '../../interfaces/cartItems';


const CartDropdown = () => {
 
  const navigate = useNavigate();
  const cart = useRef<null | HTMLDivElement>(null)  //remove this later after we remember what we wrote it for

  const reduxCart = useAppSelector((state: {cartItems : CartState}) => state.cartItems);
  const dispatch = useAppDispatch();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
    dispatch(showDropdown())
  }
  

  return (
    <CartDropdownContainer>
      <CartItems ref={cart}>
        { 
        reduxCart.itemsInCart.length < 1
        ? <EmptyMessage> No items in your cart</EmptyMessage>
        : reduxCart.itemsInCart.map((item) =>( <CartItem item={item} key={item.id} />))
        }
        

      </CartItems>
          <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer>
  )
};

export default CartDropdown