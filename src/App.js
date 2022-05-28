
import { Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Home";
import About from "./About";
import SignIn from "./SignIn";
import Splash from './Splash'
import React from "react";
import SignUp from "./SignUp";
import Reset from "./Reset";
import Page from "./Page";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/page" element={<Page />} />
      </Routes>

    </div>
  );
}

export default App;
