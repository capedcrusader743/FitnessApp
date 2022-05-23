import React from 'react'
import './SignIn.css'
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import {auth} from "./firebaseConfig.js"

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((re) => {
                console.log(re);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
    <div className='sign_in'>
        <h1>Welcome to SignIn Page</h1>
        <button onClick={signInWithGoogle}>
            Sign In
        </button>
    </div>
    )
}

export default SignIn