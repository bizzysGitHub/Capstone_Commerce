import React, { ReactNode, useContext } from 'react'
// import IStoreProducts from '../../interfaces/products'
import IStoreItems from "../../interfaces/storeItems";
import { CartContext } from '../../contexts/cart-contexts'
import {CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Arrow, Value, RemoveButton} from './checkout-item.styles'

type Props = {

    item: IStoreItems
}

const CheckoutItem = ({ item }: Props) => {
    const { id, name, imageUrl, price, quantity = 0 } = item;
    const { addItemToCart, removeItemFromCart,clearItemFromCart } = useContext(CartContext)
;

    const clearItemHandler = () => clearItemFromCart(item)
    const addItemHandler = () => addItemToCart(item)
    const removeItemHandler = () => removeItemFromCart(item)


    return (
        <CheckoutItemContainer key={id}>
            <ImageContainer src={imageUrl} />
            <Name className='name'>{name}</Name>
            <Quantity>
                <Arrow onClick={() => removeItemHandler()}>
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={() => addItemHandler()}>
                    &#10095;
                </Arrow>
            </Quantity>

            <Price>${price * quantity}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem