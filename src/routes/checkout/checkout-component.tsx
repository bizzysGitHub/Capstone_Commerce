import { useContext } from "react"
import { CartContext } from "../../contexts/cart-contexts"
import CheckoutItem from "../../components/checkout-item/checkout-item-component"
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'


const Checkout = () => {
    const { itemsInCart, totalPrice } = useContext(CartContext);

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
                {itemsInCart.map(cartItem => (
                    <CheckoutItem key={cartItem.id} item={cartItem} />
                ))}
                <Total>${totalPrice}</Total>
            </CheckoutContainer>
        </>
    )
}

export default Checkout