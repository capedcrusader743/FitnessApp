import React from 'react'
import './SignIn.css'
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";
import {auth, signInWithGoogle} from "./firebaseConfig.js"
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";


function SignIn() {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((re) => {
                console.log(re);
                navigate('/about');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
    <div className='sign_in'>
        <h1 className='welcome'>Welcome to SignIn Page</h1>
        <img className='fitness_icon' src='https://i.pinimg.com/736x/99/ec/1b/99ec1bc01c1c759a9af0f35ed8477531.jpg' alt='' />
        <h1 className='app_name'>App Name</h1>
        <p className='motivation_intro'>Are You Ready to Get Shredded?</p>
        <button onClick={signInWithGoogle}>
            Sign In
        </button>
    </div>
    )
}

export default SignIn