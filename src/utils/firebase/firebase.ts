import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
  CollectionReference,
  writeBatch,
  getDocs,
  query
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyDNVfLUQ7TYhfBko1L2mZ_78ibf1oaUePs',
  authDomain: 'crown-clowthing-db.firebaseapp.com',
  projectId: 'crown-clowthing-db',
  storageBucket: 'crown-clowthing-db.appspot.com',
  messagingSenderId: '90809430808',
  appId: '1:90809430808:web:ff7b9256c398d8e544a46d',
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
auth.languageCode = 'it';

const db = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  login_hint: 'user@example.com',
  prompt: 'select_account'
});

export const addCollectionsAndDocuments = async (collectionKey: string, objectToAdd: any) => {
const collectionRef: CollectionReference<DocumentData>
= collection(db, collectionKey);
const batch = writeBatch(db);

objectToAdd.forEach((object:any) => {
  const docRef = doc(collectionRef, object.title.toLowerCase());
  batch.set(docRef,object);
});
await batch.commit();
};

// export const getAllDocumentsFromCategories = async () => {
//   const querySnapshot = await getDocs(collection(db, "categories"));
//   const caterMap = querySnapshot.docs.reduce((acc: any , docSnapshot)=> {
//     const { title, items } = docSnapshot.data();
//       acc[title.toLowerCase()] = items;
//   }, {})

//   console.log(caterMap)

// }

export const getCategoriesAndDocs = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categoryMap = querySnapshot.docs.reduce((acc: any , docSnapshot)=> {
        const {items, title} = docSnapshot.data();
          acc[title.toLowerCase()] = items;
          return acc
      }, {})
    
      return categoryMap
}

export const getDocFromUserAuth = async (userAuth:User, otherInformation:object={}) => {
  const docRef: DocumentReference<DocumentData> = doc(db, 'users', userAuth.uid);
  const docSnap :DocumentSnapshot<DocumentData>  = await getDoc(docRef);


  if (docSnap.exists()) {
    return  docSnap.data()
  } else {
    try {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      await setDoc(doc(db, "users", userAuth.uid), {
        displayName,
        email,
        createdAt,
        ...otherInformation

      });
    } catch (error) {
      console.log(error);
    }
    const updatedDocSnap =  await getDoc(docRef);
    console.log('docSnap is : ' + JSON.stringify(updatedDocSnap.data()));
    
  }

}

export const loginWithGooglePopup = async () => {

  const response = await signInWithPopup(auth, provider)
  const { user } = response;
  const userInfoFromFirebase = await getDocFromUserAuth(user)

  return userInfoFromFirebase
 
}

export const handleNewUserWithEmailPassword = async (email: string, password:string, additionalInfo: object ={}) => {
 if(!email || !password ) {
  alert("Uh-oh either your email or password is missing :( ")
  return;
 }
 
const {user} = await createUserWithEmailAndPassword(auth, email, password)
const userInfoFromFirebase = await getDocFromUserAuth(user,additionalInfo)

// return user 
return userInfoFromFirebase
}


export const signUserInWithEmailAndPassword = async (email:string, password:string) => {
  if(!email || !password ) {
    alert("Uh-oh either your email or password is missing :( ")
    return;
   }
   try{
    const {user} = await signInWithEmailAndPassword(auth, email, password)
    const userInfoFromFirebase = await getDocFromUserAuth(user)
 
    //console.log(user)
    return userInfoFromFirebase
 
   } catch(error){
    if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password':
            alert("wrong password my guy")
            break;
          case 'auth/user-not-found':
            alert("No user here bruh")
            break;
          default: "no errors"
            break;
        }
    }
   }
   
} 

export const signOutUser = async() => await signOut(auth)

export const onAuthStateChangeListner = (callback:any) => onAuthStateChanged(auth,callback)