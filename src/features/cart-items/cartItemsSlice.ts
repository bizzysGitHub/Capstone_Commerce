import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IStoreItems from '../../interfaces/storeItems'
import { RootState } from "../../app/store";


interface CartItemState {
    itemsInCart: IStoreItems[],
    totalItems: number,
    totalPrice: number,
    showDropdown: boolean

}

const initialState: CartItemState = {
    itemsInCart: [],
    totalItems: 0,
    totalPrice: 0,
    showDropdown: false
}

//helper functions

const increaseCartItem = (addedCartItem: IStoreItems, state: CartItemState) => {

    //check if item is already in cart
   const existingItem = state.itemsInCart.find(itemInCart => itemInCart.id === addedCartItem.id);

    //if the item exist in the cart increase the quantity count of item 

    existingItem && addedCartItem.quantity 
    ? addedCartItem.quantity +=1 
    : addedCartItem.quantity = 1
    

    //item added to the cart  
    
    state.itemsInCart.push(addedCartItem)

    //total items increase by 1, and the price of the item to the total price 

    state.totalItems += 1;
    state.totalPrice === 0 ? state.totalPrice = addedCartItem.price : state.totalPrice += addedCartItem.price
    
    //price be updated by item price amount and added if price exist
}

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers : {
        addItemToCart : (state, action: PayloadAction<IStoreItems>) => {increaseCartItem(action.payload, state)},
        removeItemFromCart:()=>{null},
        showDropdown: (state) => {state.showDropdown = !state.showDropdown}
    }

});


export const {addItemToCart, showDropdown} = cartItemsSlice.actions;
export const selectCart = (state : RootState) => state.cartItems
export default cartItemsSlice.reducer
