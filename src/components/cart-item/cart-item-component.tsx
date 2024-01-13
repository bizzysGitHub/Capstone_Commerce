// import { CartContext } from '../../contexts/cart-contexts'
// import { useContext, useState } from 'react';
import IStoreItems from '../../interfaces/storeItems';
import { CartItemContainer, ItemDetails, ItemName, ItemCount } from './cart-item.styles';

type Props = {
    item: IStoreItems
}

const CartItem = ({ item: { id, name, price, imageUrl, quantity = 0 } }: Props) => {


    return (
        <>
            <CartItemContainer key={id}>
                <img src={imageUrl} alt={name} />
                <ItemDetails>
                    <ItemName>{name}</ItemName>
                    <ItemCount>{quantity} X <span>${price * quantity}</span></ItemCount>
                </ItemDetails>

            </CartItemContainer>
        </>
    );


}

export default CartItem