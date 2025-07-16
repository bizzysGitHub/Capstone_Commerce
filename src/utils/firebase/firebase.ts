/* eslint-disable @typescript-eslint/no-explicit-any */
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
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { CategoryItem } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
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



/**
 * 
 * @param collectionKey  the key you want to make the changes to
 * @param objectToAdd  the object and the type you want to add as a field in the document
 *  this function definitely shouldn't be available to to the public.. Also need to add those config strings to an env file
 */
export const addFieldsAndDocuments = async (collectionKey: string, objectToAdd: any) => {

  const collectionRef = collection(db, collectionKey);
  const snapshot = await getDocs(collectionRef);
  const batch = writeBatch(db);

  snapshot.docs.forEach((_collection) => {
    const docRef = doc(collectionRef, _collection.id);
    batch.update(docRef, objectToAdd);
  });

  await batch.commit();

};


export const getCategoriesAndDocs = async (): Promise<
  { [key: string]: { previewImg: string; items: CategoryItem[] } }[]
> => {
  const snapshot = await getDocs(collection(db, "categories"));

  const itemsDataArray = snapshot.docs.reduce(
    (
      acc: { [key: string]: { previewImg: string; items: CategoryItem[] } }[],
      doc
    ) => {
      const { items, title, image } = doc.data();
      const dataEntry = {
        [title]: {
          previewImg: image,
          items: items
        }
      };

      // return [...acc, dataEntry];
      return [...acc, dataEntry];
    },
    []
  );

  console.log(itemsDataArray);

  return itemsDataArray;
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