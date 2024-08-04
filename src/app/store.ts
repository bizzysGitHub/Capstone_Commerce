import { configureStore } from "@reduxjs/toolkit";
import cartItemsSlice from "../features/cart-items/cartItemsSlice";



export const store = configureStore({
    reducer:{
        cartItems:cartItemsSlice
    }
});


export type RootState = ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch