import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { Categories } from "@/utils/types/category";




const initialState: Categories = {
    categoriesMap: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getCategories = createAsyncThunk('categories/retrieve', async (_, thunkAPI) => {
    try {
        const data = await getCategoriesAndDocs();
        console.log(data);

        return data;
    } catch (error: unknown) {

        //not sure about error message type
        //need to do more research 

        if (error instanceof FirebaseError) {
            console.error('Error Code:', error.code);
            console.error('Error Message:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        } return thunkAPI.rejectWithValue(error)
    }
})

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(getCategories.fulfilled, (state, action) => {

                state.categoriesMap = action.payload
                state.isLoading = false,
                    state.isSuccess = true
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true;

                if (action.error && typeof action.error.message === 'string') {
                    state.message = action.error.message;
                } else {
                    state.message = 'An unknown error occurred';
                }
            })
    }
})


export default categorySlice.reducer