import { DocumentData } from "firebase/firestore"

// export type SignInThunk = AsyncThunkAction<string, UserInfo, >

export type UserInfo = {
  email: string,
  password: string,
  userDataFromFirebase: DocumentData | string |null,
  isError: boolean,
  isLoading: boolean,
  darkMode: boolean

}

