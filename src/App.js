import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </div> 
    );
}


export default App;