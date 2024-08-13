import CheckoutItem from "../../components/checkout-item/checkout-item-component"
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'
import { useAppSelector } from "../../app/hooks/custom"
import IStoreItems from "../../interfaces/storeItems"
import CartState from "../../interfaces/cartItems"

const Checkout = () => {
    const cart = useAppSelector((state : { cartItems:CartState }) => state.cartItems)
    const { itemsInCart, totalPrice }  = cart 

    return (
        <>
            <CheckoutContainer>
                <CheckoutHeader>
                    <HeaderBlock><span className="">Products</span></HeaderBlock>
                    <HeaderBlock><span className="">Description</span></HeaderBlock>
                    <HeaderBlock><span className="">Quantity</span></HeaderBlock>
                    <HeaderBlock><span className="">Price</span></HeaderBlock>
                    <HeaderBlock><span className="">Remove</span></HeaderBlock>
                </CheckoutHeader>
                {itemsInCart.map((cartItem: IStoreItems) => (
                    <CheckoutItem key={cartItem.id} item={cartItem} />
                ))}
                <Total>${totalPrice}</Total>
            </CheckoutContainer>
        </>
    )
}

export default Checkout