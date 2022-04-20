import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Pages/Main/Main";
import News from "./Pages/News/News";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route exact path='/news' element={<News />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
