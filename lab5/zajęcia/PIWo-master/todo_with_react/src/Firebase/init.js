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
  apiKey: "AIzaSyCePrcr3jhpUAy6t1e7BPXVWKgJk_HwUow",
  authDomain: "todo-lab5-259161.firebaseapp.com",
  projectId: "todo-lab5-259161",
  storageBucket: "todo-lab5-259161.appspot.com",
  messagingSenderId: "996400221092",
  appId: "1:996400221092:web:d8c5fcaeb0c6f74b9ccf31",
  measurementId: "G-YH81BXKH0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);