import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword 
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
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
	userAuth,
	addionalInformation = {},
) => {
	const userDocRef = doc(db, 'users', userAuth.uid)

	console.log('the ref >>>', userDocRef)

	const userSnapshot = await getDoc(userDocRef)
	console.log('the snapshot >>>', userSnapshot)
	console.log('the snapshot >>>', userSnapshot.exists())

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...addionalInformation,
			})
		} catch (error) {
			console.log('the error in creating the user', error)
		}
	}
	return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return signInWithEmailAndPassword(auth, email, password)
}