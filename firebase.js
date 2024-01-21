// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: "vue3firebassecurd.firebaseapp.com",
  projectId: "vue3firebassecurd",
  storageBucket: "vue3firebassecurd.appspot.com",
  messagingSenderId: "872425092017",
  appId: "1:872425092017:web:bc9bdcf0bd7bafd6160390"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)