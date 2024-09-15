import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
  setDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
  CollectionReference,
  writeBatch,
  getDocs} from "firebase/firestore";

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

  objectToAdd.forEach((object: any) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
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
  const categoryMap = querySnapshot.docs.reduce((acc: any, docSnapshot) => {
    const { items, title, image } = docSnapshot.data();
    //make first letter capitalized
    acc[title] = {items:items, img: image}
    return acc
  }, {})
  
  return categoryMap
}

export const getDocFromUserAuth = async (userAuth: User, otherInformation: object = {}) => {
  const docRef: DocumentReference<DocumentData> = doc(db, 'users', userAuth.uid);
  let docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);


  if (docSnap.exists()) {
    return docSnap.data();
  }

  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(docRef, {
      displayName,
      email,
      createdAt,
      ...otherInformation
    });

    docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Failed to create or retrieve the document.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error creating or fetching the document.');
  }


}

export const loginWithGooglePopup = async () => {

  const response = await signInWithPopup(auth, provider)
  const { user } = response;
  const userInfoFromFirebase = await getDocFromUserAuth(user)

  return userInfoFromFirebase

}

export const handleNewUserWithEmailPassword = async (email: string, password: string, additionalInfo: object = {}) => {
  if (!email || !password) {
    alert("Uh-oh either your email or password is missing :( ")
    return;
  }

  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  const userInfoFromFirebase = await getDocFromUserAuth(user, additionalInfo)

  // return user 
  return userInfoFromFirebase
}


export const signUserInWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) {
    alert("Uh-oh either your email or password is missing :( ")
    throw new Error("Must enter email and password")
    
  }
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const userInfoFromFirebase = await getDocFromUserAuth(user)

    return userInfoFromFirebase

  } catch (error) {
    if (error instanceof FirebaseError) {
      const cleanedUpErrorCode = (error.code.match(/auth\/(.+)/) as Array<string>)
        alert(cleanedUpErrorCode[1])
        throw new Error(cleanedUpErrorCode[1]);
        
    }
    console.log(error);
    
    throw new Error("Something went wrong. Please try again")
    
  }

}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangeListener = (callback: any) => onAuthStateChanged(auth, callback)