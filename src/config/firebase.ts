// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUbm69aflKWWErS24sKAXCs7ql9VTu9Ts",
  authDomain: "react-firebase-6e4c4.firebaseapp.com",
  projectId: "react-firebase-6e4c4",
  storageBucket: "react-firebase-6e4c4.appspot.com",
  messagingSenderId: "160316522882",
  appId: "1:160316522882:web:460f442ccb5ca91b4b4f9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)