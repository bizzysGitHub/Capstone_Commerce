import './cart-item.styles.scss'
import { CartContext } from '../../contexts/cart-contexts'
import { useContext, useState } from 'react';
import IStoreItems from '../../interfaces/storeItems';
type Props = {
    item: IStoreItems
}

const CartItem = ({ item: { id, name, price, imageUrl, quantity = 0 } }: Props) => {


    return (
        <>
            <div
                className='cart-item-container'
                key={id}>
                <img src={imageUrl} alt={name} />
                <div className="item-details">
                    <span className='name'>{name}</span>
                    <div className='item-count'>{quantity} X <span>${price * quantity}</span></div>
                    
                </div>

            </div>
        </>
    );


}

export default CartItem