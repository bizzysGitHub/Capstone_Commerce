
// import { ReactNode, useContext } from 'react';
// import { CartIconContainer } from './cart-icon.styles';
import { useAppSelector } from '../../app/hooks/custom';
import { CartState } from '@/utils/types'
import ShoppingSVG from '@/assets/shopping-bag.svg?react'
import { ReactNode } from 'react';





const ShoppingIcon = () => (
  <ShoppingSVG className="w-6 h-6" />
);
const ItemCount = ({ children }: { children: number }) => (
  <span className="absolute bottom-3 text-[10px] font-bold">
    {children}
  </span>
);
const CartIconContainer = ({ onClick, children }: {
  onClick: () => void;
  children: ReactNode
}) => (
  <div className="w-[45px] h-[45px] relative flex items-center justify-center cursor-pointer" onClick={onClick}>
    {children}
  </div>
);

const CartIcon = ({ onClick }: {onClick: () => void}) => {
  const cart = useAppSelector((state: { cartItems: CartState }) => state.cartItems)

  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon />
      <ItemCount>{cart.totalItems}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon