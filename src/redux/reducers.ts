import { combineReducers } from "@reduxjs/toolkit";
import cartItemSlice from "../features/cart-items/cartItemSlice";
import categorySlice from "../features/categories/categorySlice"
import usersSlice from "../features/user-information/usersSlice";


const rootReducer = combineReducers({
        cartItems:cartItemSlice,
        categories:categorySlice,
        users:usersSlice
})

export default rootReducer