import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { CartState } from "@/utils/types";
import { CategoryItem } from "@/utils/types";

const initialState: CartState = {
  itemsInCart: [],
  totalItems: 0,
  totalPrice: 0,
  showDropdown: false
}

const recalculateTotals = (state: CartState) => {
  state.totalItems = state.itemsInCart.reduce((sum, item) => sum + (item.quantity ?? 0), 0)
  state.totalPrice = state.itemsInCart.reduce((sum, item) => sum + ((item.quantity ?? 0) * item.price), 0)
}

const increaseCartItem = (state: CartState, addedCartItem: CategoryItem) => {
  const existingItem = state.itemsInCart.find(itemInCart => itemInCart.id === addedCartItem.id);

  if (!existingItem) {
    const newCartItem = { ...addedCartItem, quantity: 1 };

    state.itemsInCart.push(newCartItem);
  } else {
    existingItem.quantity = (existingItem.quantity ?? 0) + 1
  }

  recalculateTotals(state)

}
const decreaseCartItem = (state: CartState, itemToRemove: CategoryItem) => {

  const duplicateInCart = state.itemsInCart.find((item) => item.id === itemToRemove.id)

  if (!duplicateInCart) {
    return
  }

  const nextQuantity = (duplicateInCart.quantity ?? 0) - 1

  if (nextQuantity <= 0) {
    state.itemsInCart = state.itemsInCart.filter(item => item.id !== itemToRemove.id)
  } else {
    duplicateInCart.quantity = nextQuantity
  }

  recalculateTotals(state)
}
const clearItemFromCart = (state: CartState, itemToClear: CategoryItem) => {

  state.itemsInCart = state.itemsInCart.filter(item => item.id !== itemToClear.id)
  recalculateTotals(state)
}


export const cartItemSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CategoryItem>) => { increaseCartItem(state, action.payload) },
    removeItemFromCart: (state, action: PayloadAction<CategoryItem>) => { decreaseCartItem(state, action.payload) },
    showDropdown: (state) => { state.showDropdown = !state.showDropdown },
    zeroOutItem: (state, action: PayloadAction<CategoryItem>) => { clearItemFromCart(state, action.payload) },
    emptyCart: () => initialState
  }
});


export const { addItemToCart, removeItemFromCart, showDropdown, zeroOutItem, emptyCart } = cartItemSlice.actions;
export const selectCart = (state: RootState) => state.cartItems
export default cartItemSlice.reducer
