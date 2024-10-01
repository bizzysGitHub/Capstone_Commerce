// import React, { ReactNode, useContext } from 'react'
// import IStoreProducts from '../../interfaces/products'
import IStoreItems from "../../interfaces/storeItems";
// import { CartContext } from '../../contexts/cart-contexts'
import { CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Arrow, Value, RemoveButton } from './checkout-item.styles'
import { useAppDispatch } from '../../app/hooks/custom';
import { addItemToCart, removeItemFromCart, zeroOutItem } from '../../features/cart-items/cartItemSlice'

type Props = {

    item: IStoreItems
}

const CheckoutItem = ({ item }: Props) => {
    const { id, name, imageUrl, price, quantity = 0 } = item;
    const dispatch = useAppDispatch()

    return (
        <CheckoutItemContainer key={id}>
            <ImageContainer src={imageUrl} />
            <Name className='name'>{name}</Name>
            <Quantity>
                <Arrow onClick={() => { dispatch(removeItemFromCart(item)) }}>
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={() => { dispatch(addItemToCart(item)) }}>
                    &#10095;
                </Arrow>
            </Quantity>

            <Price>${price * quantity}</Price>
            <RemoveButton onClick={() => { dispatch(zeroOutItem(item))}}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem