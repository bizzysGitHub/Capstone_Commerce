import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IStoreItems from '../../interfaces/storeItems'
import { RootState } from "../../app/store";
import CartState from "../../interfaces/cartItems";



const initialState: CartState = {
  itemsInCart: [],
  totalItems: 0,
  totalPrice: 0,
  showDropdown: false
}


/**
 * 
 * @param state  Redux uses Immer which allows you to write code to mutate state directly and under the hood it will fix it so its not actually mutating state
 * @param addedCartItem this is a prop so I cant mutate it directly . thus creating a new variable and adding that to the state for the changes needed for the item
 */


//helper functions

const increaseCartItem = (state: CartState, addedCartItem: IStoreItems) => {

  //check if item is already in cart

  const existingItem = state.itemsInCart.find(itemInCart => itemInCart.id === addedCartItem.id);

  //if the item dosent exist in the cart increase the quantity to 1 

  if (!existingItem) {
    const newCartItem = { ...addedCartItem, quantity: 1 };

    state.itemsInCart.push(newCartItem);
  } else {
    // If the item exists in the cart, update its quantity by 1

    state.itemsInCart = state.itemsInCart.map((item) => {
      if (item.id === existingItem.id) {
        // Return a new item object with updated quantity
        item.quantity ? item.quantity += 1 : null
      }
      // Return the item unchanged if it does not match
      return item;
    });
  }


  //total items increase by 1, and the price of the item to the total price 

  state.totalItems += 1;
  state.totalPrice === 0 ? state.totalPrice = addedCartItem.price : state.totalPrice += addedCartItem.price

}
const decreaseCartItem = (state: CartState, itemToRemove: IStoreItems) => {

  const duplicateInCart = state.itemsInCart.find((item) => item.id === itemToRemove.id)

  if (duplicateInCart && duplicateInCart.quantity as number > 0) {

    duplicateInCart.quantity = duplicateInCart.quantity as number - 1

  }

  if (duplicateInCart && duplicateInCart.quantity === 0) {
    clearItemFromCart(state, duplicateInCart)
  }


  if (itemToRemove.quantity !== 0) {
    state.totalItems = state.totalItems !== 0 ? state.totalItems -= 1 : 0;
    state.totalPrice = state.totalPrice !== 0 ? state.totalPrice - itemToRemove.price : 0

  }



}
const clearItemFromCart = (state: CartState, itemToClear: IStoreItems) => {

  state.itemsInCart = state.itemsInCart.filter(item => item.id !== itemToClear.id)
  state.totalPrice = state.totalPrice - (itemToClear.price * (itemToClear.quantity as number))
  state.totalItems = state.totalItems - (itemToClear.quantity as number)
}


export const cartItemSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IStoreItems>) => { increaseCartItem(state, action.payload) },
    removeItemFromCart: (state, action: PayloadAction<IStoreItems>) => { decreaseCartItem(state, action.payload) },
    showDropdown: (state) => { state.showDropdown = !state.showDropdown },
    zeroOutItem: (state, action: PayloadAction<IStoreItems>) => { clearItemFromCart(state, action.payload) }

  }

});


export const { addItemToCart, removeItemFromCart, showDropdown, zeroOutItem } = cartItemSlice.actions;
export const selectCart = (state: RootState) => state.cartItems
export default cartItemSlice.reducer
