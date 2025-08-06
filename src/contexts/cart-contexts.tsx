import { CategoryItem } from "@/utils/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useReducer } from "react";

type Props = {
    children: ReactNode
}
export default interface ICartContext {
    itemsInCart: CategoryItem[],
    // setItemsInCart: Dispatch<SetStateAction<CategoryItem[]>>,
    totalItems: number
    // setTotalItems: Dispatch<SetStateAction<number>>,
    totalPrice: number
    // setTotalPrice: Dispatch<SetStateAction<number>>,
    addItemToCart: (productToAdd: CategoryItem) => void
    removeItemFromCart: (cartItemToRemove: CategoryItem) => void
    clearItemFromCart: (cartItemToClear: CategoryItem) => void
    showDropdown: boolean,
    setShowDropDown: Dispatch<SetStateAction<boolean>>,


}

export const CartContext = createContext<ICartContext>({
    itemsInCart: [],
    // setItemsInCart: () => null,
    totalItems: 0,
    // setTotalItems: () => null,
    totalPrice: 0,
    // setTotalPrice: () => null,
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    showDropdown: false,
    setShowDropDown: () => null,

});


//Helper functions 
const IncreaseItemQuantity = (cartItems: CategoryItem[], productToAdd: CategoryItem) => {

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

const DecreaseItemQuantity = (cartItems: CategoryItem[], cartItemToRemove: CategoryItem) => {

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

const clearCartItem = (cartItems: CategoryItem[], cartItemToClear: CategoryItem) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)


type State = {
    itemsInCart: CategoryItem[],
    totalItems: number,
    totalPrice: number,
    showDropdown: boolean,

};


type CartAction =
    | { type: 'SET_CART_ITEMS', payload: State }
    // | { type: 'CLEAR_CART', payload: State }
    | { type: 'SHOW_DROPDOWN', payload: boolean };



const INITIAL_STATE: State = {
    itemsInCart: [],
    totalItems: 0,
    totalPrice: 0,
    showDropdown: false

};

const CartReducer = (state: State, action: CartAction) => {

    const { type, payload } = action;

    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload
            }

        case 'SHOW_DROPDOWN': 
            return{
                ...state,
                showDropdown:!state.showDropdown,

            }

        default:
            throw new Error(`Unhandled action type ${type}`)
    }
};


export const CartProvider = ({ children }: Props) => {


    const [{ itemsInCart, totalItems, totalPrice, showDropdown }, dispatch] = useReducer(CartReducer, INITIAL_STATE);
   
    // const [showDropdown, dispatch2] = useReducer(() => !INITIAL_STATE.showDropdown, INITIAL_STATE);


    const updateCartReducer = (newCartItem: CategoryItem[]) => {
        const newCartCount = newCartItem.reduce((total, cartItem) => total + Number(cartItem.quantity), 0)

        const newCartPrice = newCartItem.reduce((total, cartItem) => total + Number(cartItem.quantity) * cartItem.price, 0)

        dispatch({ type: 'SET_CART_ITEMS', payload: { itemsInCart: newCartItem, totalItems: newCartCount, totalPrice: newCartPrice, showDropdown } })

        // dispatch({type:'CLEAR_CART', payload:INITIAL_STATE})

    };

    const setShowDropDown = () => {
        dispatch({ type: 'SHOW_DROPDOWN', payload:showDropdown })
    };


    const addItemToCart = (productToAdd: CategoryItem) => {
        const addedItemsArray = IncreaseItemQuantity(itemsInCart, productToAdd);
        updateCartReducer(addedItemsArray)
    };

    const removeItemFromCart = (cartItemToRemove: CategoryItem) => {
        const deletedItemArray = DecreaseItemQuantity(itemsInCart, cartItemToRemove);
        updateCartReducer(deletedItemArray)
    };
    const clearItemFromCart = (cartItemToClear: CategoryItem) => {
        const clearedArray = clearCartItem(itemsInCart, cartItemToClear);
        updateCartReducer(clearedArray)

    };



    const value = {
        itemsInCart,
        // setItemsInCart,
        totalItems,
        // setTotalItems,
        addItemToCart,
        totalPrice,
        // setTotalPrice,
        removeItemFromCart,
        clearItemFromCart,
        showDropdown,
        setShowDropDown
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};

/**
 * 
 * 3178036272
 * 
 */