import * as firebase from "firebase/app"
import * as auth from "firebase/auth"
import * as firestore from 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string
})

export const authConfig = auth.getAuth(app)
export const db = firestore.getFirestore(app)
