import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';

function Navbar() {
    const [navbarMoblie, setNavbarMoblie] = useState(false);

    function toggleNavbarMoblie() {
        setNavbarMoblie(prevValue => !prevValue);
    }

    return (
        <nav className="hr__navbar">
            <div className='hr__logo-container'>
                <img src="./img/logo.png"></img>
                <h1 className="hr__logo-name">HeartRate</h1>
            </div>
            <ul className={navbarMoblie ? 'hr__nav-item active' : 'hr__nav-item'}>
                <Link to="/" className="hr__nav-link">Home</Link>
                <Link to="/" className="hr__nav-link">Statistics</Link>
                <Link to="/" className="hr__nav-link">Profile</Link>
            </ul>
            <div className="hr__nav-moblie" onClick={toggleNavbarMoblie}>
                {navbarMoblie ? <IoCloseSharp /> : <GiHamburgerMenu />}
            </div>
        </nav>
    );
}

export default Navbar;