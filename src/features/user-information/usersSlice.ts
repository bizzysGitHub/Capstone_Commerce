import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginWithGooglePopup, signOutUser, signUserInWithEmailAndPassword } from '../../utils/firebase/firebase';
import { UserInfo } from '@/utils/types/user';
import { DocumentData } from 'firebase/firestore';

const initialState: UserInfo = {
  email: "",
  password: "",
  userDataFromFirebase: null,
  isError: false,
  isLoading: false,
  darkMode: true,
  isAuthResolved: false
};

export const loginWithEmailAndPassword = createAsyncThunk('users/loginWithEmail', async (userStateInfo: UserInfo, thunkAPI) => {
  try {
    const userData = await signUserInWithEmailAndPassword(userStateInfo.email, userStateInfo.password)
    return JSON.stringify(userData)
  }
  catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const loginWithGoogle = createAsyncThunk('users/loginWithGoogle', async (_, thunkAPI) => {
  try {
    const userData = await loginWithGooglePopup();
    return JSON.stringify(userData);
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
    },
    updateUserDataFromSignUp: (state, action) => {
      state.userDataFromFirebase = action.payload
      state.isAuthResolved = true
    },
    clearLoginForm: (state) => {
      state.email = ""
      state.password = ""
    },
    setUserSession: (state, action: PayloadAction<DocumentData | string | null>) => {
      state.userDataFromFirebase = action.payload
      state.isLoading = false
      state.isError = false
      state.isAuthResolved = true
    },
    setAuthResolved: (state, action: PayloadAction<boolean>) => {
      state.isAuthResolved = action.payload
    },
    setDarkModeOn: (state) => {
      state.darkMode = !state.darkMode
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmailAndPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userDataFromFirebase = JSON.parse(action.payload)
        state.isAuthResolved = true
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
        state.userDataFromFirebase = JSON.parse(action.payload)
        state.isAuthResolved = true
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(_signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_signOutUser.fulfilled, (state) => {
        state.email = ""
        state.password = ""
        state.userDataFromFirebase = null
        state.isLoading = false
        state.isError = false
        state.isAuthResolved = true
      })
      .addCase(_signOutUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

  }
});

export const { userLoginInputChange, clearLoginForm, updateUserDataFromSignUp, setUserSession, setAuthResolved, setDarkModeOn } = usersSlice.actions

export default usersSlice.reducer
