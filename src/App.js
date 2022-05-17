
import { Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Home from "./Home";
import About from "./About";
import {auth} from "./firebaseConfig.js"
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Splash from './Splash'

function App() {
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
    <div className="App">
      <Splash />
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <button onClick={signInWithGoogle}>
        Sign In
      </button>
    </div>
  );
}

export default App;
