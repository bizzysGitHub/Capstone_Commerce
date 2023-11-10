import React, { ReactNode, useContext } from 'react'
// import IStoreProducts from '../../interfaces/products'
import IStoreItems from "../../interfaces/storeItems";
import { CartContext } from '../../contexts/cart-contexts'
import './checkout-item.styles.scss'

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
        <div key={id} className='checkout-item-container'>
            <img className='image-container' src={imageUrl} />
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItemHandler()}>
                    &#10094;
                </div>
                <span className='value'>
                    {quantity}
                </span>
                <div className='arrow' onClick={() => addItemHandler()}>
                    &#10095;
                </div>
            </span>

            <span className='price'>${price * quantity}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem