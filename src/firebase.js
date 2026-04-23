// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNUl3RIf6M57U-m8PWulaEtVO6lW2fyUI",
  authDomain: "e-commerce-6359e.firebaseapp.com",
  projectId: "e-commerce-6359e",
  storageBucket: "e-commerce-6359e.firebasestorage.app",
  messagingSenderId: "1004671668007",
  appId: "1:1004671668007:web:8be091852aa99c222e6302",
  measurementId: "G-578GBKE5BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
 export const db=getFirestore(app)
export default auth;