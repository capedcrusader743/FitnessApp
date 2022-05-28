import React, { useEffect, useState } from 'react';
import './SignIn.css';
import { auth, signInWithGoogle, logInWithEmailAndPassword } from "./firebaseConfig.js";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';


function SignIn() {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/home');
    }, [user, loading]);

    return (
        <div className='sign_in'>
            <h1 className='welcome'>Welcome to SignIn Page</h1>
            <img className='fitness_icon' src='https://i.pinimg.com/736x/99/ec/1b/99ec1bc01c1c759a9af0f35ed8477531.jpg' alt='' />
            <h1 className='app_name'>App Name</h1>
            <p className='motivation_intro'>Are You Ready to Get Shredded?</p>
            <div className='signin_container'>
                <input
                    type="text"
                    className="signin_textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="signin_textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className='signin_btn'
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login with Email
                </button>
                <button className='signin_btn signin_google'
                    onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                </div>
            </div>

        </div>
    );
}

export default SignIn