import { Dispatch, ReactNode, createContext, useEffect, useState, SetStateAction} from "react";
import { onAuthStateChangeListner as onAuthStateChangeListener, signOutUser } from "../utils/firebase/firebase";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";


type Props = {
children : ReactNode
}

interface IUserContext {
    userData : User | DocumentData | null,
    setUserData : Dispatch<SetStateAction<User |DocumentData |null>>,
}

export const UserContext = createContext<IUserContext>({
    userData : null,
    setUserData : () => null,
});

export const UserProvider = ({children}: Props) => {
    const [userData, setUserData] = useState<IUserContext["userData"]>(null) 
   
    useEffect(() => {
       const unsubscribe =  onAuthStateChangeListener((user:IUserContext["userData"]) => { 
        setUserData(user)
    })

       return unsubscribe
    }, [])
const value = {userData,setUserData}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}
