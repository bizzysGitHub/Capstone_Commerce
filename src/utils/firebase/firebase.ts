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
  Firestore,
} from "firebase/firestore";
import { CategoryItem } from '../types';
import { SHOP_DATA } from '@/data/catalog';

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

const db: Firestore = getFirestore(firebaseApp);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  login_hint: 'user@example.com',
  prompt: 'select_itemObjount'
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

type CategoryDocument = { [key: string]: { previewImg: string; items: CategoryItem[] } }

const getStaticCategories = (): CategoryDocument[] =>
  SHOP_DATA.map((category) => ({
    [category.title.toLowerCase()]: {
      previewImg: category.items[0]?.imageUrl ?? '',
      items: category.items,
    },
  }))

const getCategoriesSnapshot = async () => await getDocs(collection(db, "categories"))


export const getCategoriesAndDocs = async (): Promise<CategoryDocument[]> => {
  try {
    const snapshot = await getCategoriesSnapshot()

    return snapshot.docs.reduce((itemArr: CategoryDocument[], categoryDoc) => {
      const { items, title, image } = categoryDoc.data()

      return [
        ...itemArr,
        {
          [String(title).toLowerCase()]: {
            previewImg: image,
            items: items as CategoryItem[],
          },
        },
      ]
    }, [])
  } catch (error) {
    console.error('Falling back to static catalog data.', error)
    return getStaticCategories()
  }
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

export const onAuthStateChangeListener = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback)

export const getItemWithPrice = async () => {
  try {
    const snapshot = await getCategoriesSnapshot()

    return snapshot.docs.reduce((itemObj: { [id: string]: { price: number, name: string } }, categoryDoc) => {
      const categoryData = categoryDoc.data() as { items?: CategoryItem[] }

      categoryData.items?.forEach((item) => {
        itemObj[String(item.id)] = { price: item.price, name: item.name }
      })

      return itemObj
    }, {})
  } catch (error) {
    console.error('Falling back to static price data.', error)

    return SHOP_DATA.reduce((itemObj: { [id: string]: { price: number, name: string } }, category) => {
      category.items.forEach((item) => {
        itemObj[String(item.id)] = { price: item.price, name: item.name }
      })

      return itemObj
    }, {})
  }
}
