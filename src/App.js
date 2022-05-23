
import { Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Home from "./Home";
import About from "./About";
import SignIn from "./SignIn";

import Splash from './Splash'
import React, { useState } from "react";
import SignUp from "./SignUp";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default App;
