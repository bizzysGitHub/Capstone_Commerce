import { useContext, useRef } from 'react'
import { CartContext } from '../../contexts/cart-contexts'
import Button from '../button/button.component'
import {CartItems, EmptyMessage, CartDropdownContainer} from'./cart-dropdown.styles'
import CartItem from '../cart-item/cart-item-component';
import {  useNavigate } from 'react-router-dom';



const CartDropdown = () => {
  const { itemsInCart, setShowDropDown } = useContext(CartContext);
  const navigate =useNavigate();
  const cart = useRef<null | HTMLDivElement>(null)

  const goToCheckoutHandler = () => {
    navigate('/checkout')
    setShowDropDown(false)
  }
  

  return (
    <CartDropdownContainer>
      <CartItems ref={cart}>
        { 
        itemsInCart.length < 1
        ? <EmptyMessage> No items in your cart</EmptyMessage>
        : itemsInCart.map((item) =>( <CartItem item={item} key={item.id} />))
        }
        

      </CartItems>
          <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer>
  )
};

export default CartDropdown