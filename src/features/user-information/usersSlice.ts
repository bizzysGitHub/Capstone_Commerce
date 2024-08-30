import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DocumentData } from 'firebase/firestore';
import { loginWithGooglePopup, signOutUser, signUserInWithEmailAndPassword } from '../../utils/firebase/firebase';


interface UserInfo {
  email: string,
  password: string,
  userDataFromFirebase: DocumentData | null,
  isError: boolean,
  isLoading: boolean,

}

/***
 * NEED TO UPDATE ALL THE FORMS TO USE REACT-HOOK-FORMS PACKAGE
 */

const initialState: UserInfo = {
  email: "",
  password: "",
  userDataFromFirebase: null,
  isError: false,
  isLoading: false,


};

export const loginWithEmailAndPassword = createAsyncThunk('users/loginWithEmail', async (userStateInfo: UserInfo, thunkAPI) => {
  try {
    const userData = await signUserInWithEmailAndPassword(userStateInfo.email, userStateInfo.password)
    return userData
  }
  catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
    // throw new Error("Something went wrong ");
  }

})



export const loginWithGoogle = createAsyncThunk('users/loginWithGoogle', async (_, thunkAPI) => {

  try {
    const userData = await loginWithGooglePopup();
    return userData;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error)
  }

})

export const _signOutUser = createAsyncThunk('users/_signOutUser', async (_, thunkAPI) => {
  try {
    await signOutUser()
  } catch (error) {

    return thunkAPI.rejectWithValue(error)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLoginInputChange: (state, action: PayloadAction<{ id: string, value: string }>,) => {
      const { id, value } = action.payload
      id === 'email'
        ? state.email = value
        : id === 'password'
          ? state.password = value
          : null

      // state[id] = value   //figure out how to make this work later :/
    },
    updateUserDataFromSignUp : (state, action) => {
      state.userDataFromFirebase = action.payload
    },
    clearLoginForm: (state) => {
      state.email = ""
      state.password = ""
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmailAndPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userDataFromFirebase = action.payload
      })
      .addCase(loginWithEmailAndPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userDataFromFirebase = action.payload
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(_signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_signOutUser.fulfilled, () => initialState)
      .addCase(_signOutUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

  }
});

export const { userLoginInputChange, clearLoginForm, updateUserDataFromSignUp } = usersSlice.actions

export default usersSlice.reducer