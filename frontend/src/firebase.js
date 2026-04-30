import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 authDomain: "green-f45d6.firebaseapp.com",
  projectId: "green-f45d6",
  storageBucket: "green-f45d6.firebasestorage.app",
  messagingSenderId: "997738332655",
  appId: "1:997738332655:web:278837f6e80d18cf30b61a",
  measurementId: "G-XLTC7R9TK2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);