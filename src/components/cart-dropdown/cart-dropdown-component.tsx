import { useContext } from 'react'
import { CartContext } from '../../contexts/cart-contexts'
import Button from '../button/button.component'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item-component';
import {  useNavigate } from 'react-router-dom';



const CartDropdown = () => {
  const { itemsInCart, setShowDropDown } = useContext(CartContext);
  const navigate =useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
    setShowDropDown(false)
  }
  

  return (
    <div className='cart-dropdown-container'>
      <div className="cart-items">
        {itemsInCart.map((item) => {
          return (
            <CartItem item={item} key={item.id} />
          )
        })}

          <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
      </div>
    </div>
  )
};

export default CartDropdown