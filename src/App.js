import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Pages/Main/Main";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Report from "./Pages/Report/Report";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/report' element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
