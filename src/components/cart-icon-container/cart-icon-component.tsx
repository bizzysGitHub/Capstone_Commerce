
import { ReactNode, useContext } from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart-contexts';


type Props = {
  
  // children: ReactNode;
  onClick: () => void;
};

const CartIcon = ({onClick}:Props) => {
  const {totalItems} = useContext(CartContext);
  
  return (
    <div className='cart-icon-container' onClick={onClick}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{totalItems}</span>
        </div>
  )
}

export default CartIcon