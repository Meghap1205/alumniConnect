// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alumni-connect-83466.firebaseapp.com",
  projectId: "alumni-connect-83466",
  storageBucket: "alumni-connect-83466.appspot.com",
  messagingSenderId: "488031702860",
  appId: "1:488031702860:web:d63ff0a0a3cb5f367fc9e9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
