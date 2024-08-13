
// import { ReactNode, useContext } from 'react';
import {ShoppingIcon, ItemCount,CartIconContainer} from'./cart-icon.styles';
import { useAppSelector } from '../../app/hooks/custom';
import CartState from '../../interfaces/cartItems';
// import { RootState } from '../../app/store';
// import { CartContext } from '../../contexts/cart-contexts';


type Props = {
  onClick: () => void;
};

const CartIcon = ({onClick}:Props) => {
  const cart = useAppSelector((state: { cartItems : CartState}) => state.cartItems)

  
  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon/>
        <ItemCount>{cart.totalItems}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon