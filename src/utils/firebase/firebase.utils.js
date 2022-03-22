import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCgXE0gCPO1yEzCZZbAPUfROkJS4O0hMd8',
	authDomain: 'lit-clothing-db-dc234.firebaseapp.com',
	projectId: 'lit-clothing-db-dc234',
	storageBucket: 'lit-clothing-db-dc234.appspot.com',
	messagingSenderId: '914889944004',
	appId: '1:914889944004:web:cd5a2f235c981e2a425291',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log('the ref >>>', userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    console.log('the snapshot >>>', userSnapshot);
    console.log('the snapshot >>>', userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        } catch (error) {
            console.log('the error in creating the user', error);
        }
    }
    return userDocRef
}