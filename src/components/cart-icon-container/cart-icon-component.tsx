
import { ReactNode, useContext } from 'react';
import {ShoppingIcon, ItemCount,CartIconContainer} from'./cart-icon.styles';
import { CartContext } from '../../contexts/cart-contexts';


type Props = {
  
  // children: ReactNode;
  onClick: () => void;
};

const CartIcon = ({onClick}:Props) => {
  const {totalItems} = useContext(CartContext);
  
  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon/>
        <ItemCount>{totalItems}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon