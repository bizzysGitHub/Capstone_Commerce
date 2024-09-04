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
    console.log(userData);
    /**
     * okay so redux doesn't like items returned from api class that aren't easily serialized.. 
     * so returning the who document is giving me this weird error that says "A non-serializable value was detected in an action, in the path: `payload.createdAt`. Value"
     * 
     * At the moment i don't think i need the whole document. In all actuality i dont think i need any of it in redux since firebase has all the info
     * and I havent advanced the app yet to save the cart if the user refreshes or signs out. So the next step is to persist the memory after we fix
     * 1) the form asking user to fill in the email and password when logging in through google
     * 2) updating the redux store with the user info on login. 
     */
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