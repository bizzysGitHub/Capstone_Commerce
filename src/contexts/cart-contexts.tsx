import { Dispatch, ReactNode, SetStateAction, createContext, useState, useEffect } from "react";
import IStoreProducts from "../interfaces/products"
import IStoreItems from "../interfaces/storeItems";

type Props = {
    children: ReactNode
}
export default interface ICartContext {
    itemsInCart: IStoreItems[],
    setItemsInCart: Dispatch<SetStateAction<IStoreItems[]>>,
    totalItems: number
    setTotalItems: Dispatch<SetStateAction<number>>, 
    totalPrice: number
    setTotalPrice: Dispatch<SetStateAction<number>>,
    addItemToCart: (productToAdd: IStoreItems) => void
    removeItemFromCart: (cartItemToRemove: IStoreItems) => void
    clearItemFromCart: (cartItemToClear: IStoreItems) => void
    showDropdown: boolean,
    setShowDropDown: Dispatch<SetStateAction<boolean>>,


}

export const CartContext = createContext<ICartContext>({
    itemsInCart: [],
    setItemsInCart: () => null,
    totalItems: 0,
    setTotalItems: () => null,
    totalPrice: 0,
    setTotalPrice: () => null,
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    showDropdown: false,
    setShowDropDown: () => null,

});


//Helper functions 
const IncreaseItemQuantity = (cartItems: IStoreItems[], productToAdd: IStoreItems) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: Number(cartItem.quantity) + 1 }
                : cartItem
        )
    }


    return [...cartItems, { ...productToAdd, quantity: 1 }]
};

const DecreaseItemQuantity = (cartItems: IStoreItems[], cartItemToRemove: IStoreItems) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem?.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }


    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: Number(cartItem.quantity) - 1 }
            : cartItem
    )
};

//removes all the quantity of one item from the cart
//real confusing . need to fix later

const clearCartItem = (cartItems: IStoreItems[], cartItemToClear: IStoreItems) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)



export const CartProvider = ({ children }: Props) => {
    const [itemsInCart, setItemsInCart] = useState<IStoreItems[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [showDropdown, setShowDropDown] = useState(false);


    useEffect(() => {
        const newCartCount = itemsInCart.reduce((total, cartItem) => total + Number(cartItem.quantity), 0)

        setTotalItems(newCartCount)

    }, [itemsInCart]);


    useEffect(() => {
        const newCartPrice = itemsInCart.reduce((total, cartItem) => total + Number(cartItem.quantity) * cartItem.price, 0)

        setTotalPrice(newCartPrice)

    }, [itemsInCart]);


    const addItemToCart = (productToAdd: IStoreItems) => {
        setItemsInCart(IncreaseItemQuantity(itemsInCart, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove: IStoreItems) => {
        setItemsInCart(DecreaseItemQuantity(itemsInCart, cartItemToRemove));
    };
    const clearItemFromCart = (cartItemToClear: IStoreItems) => {
        setItemsInCart(clearCartItem(itemsInCart, cartItemToClear));
    };




    const value = {
        itemsInCart, setItemsInCart, totalItems, setTotalItems, addItemToCart,
        totalPrice, setTotalPrice, removeItemFromCart, clearItemFromCart, showDropdown, setShowDropDown
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};