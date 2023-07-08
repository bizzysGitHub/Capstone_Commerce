import { useContext } from "react"
import { CartContext } from "../../contexts/cart-contexts"
import CheckoutItem from "../../components/checkout-item/checkout-item-component"
import './checkout.styles.scss'


const Checkout = () => {
    const { itemsInCart, totalPrice } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span className="">Products</span>
                </div>
                <div className="header-block">
                    <span className="">Description</span>
                </div>
                <div className="header-block">
                    <span className="">Quantity</span>
                </div>
                <div className="header-block">
                    <span className="">Price</span>
                </div>
                <div className="header-block">
                    <span className="">Remove</span>
                </div>
            </div>
            {/* list of items in checkout go here */}
            {itemsInCart.map(cartItem => (
                <CheckoutItem key={cartItem.id} item={cartItem} />
            ))}
            <div className="total"><span>${totalPrice}</span></div>
        </div>
    )
}

export default Checkout