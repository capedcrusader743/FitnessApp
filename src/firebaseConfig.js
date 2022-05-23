// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB9JyMCgFqfHhXpn9NM8PMRWYCNT9cLn4",
  authDomain: "fitnessapp-8f310.firebaseapp.com",
  projectId: "fitnessapp-8f310",
  storageBucket: "fitnessapp-8f310.appspot.com",
  messagingSenderId: "920472880112",
  appId: "1:920472880112:web:afdd8434610113a759d335",
  measurementId: "G-2WW656RVY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}

const analytics = getAnalytics(app);