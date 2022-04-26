import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { Context } from '../../Context/Context';

function Navbar() {
  const { logOut } = useContext(Context);
  const [navbarMoblie, setNavbarMoblie] = useState(false);

  function toggleNavbarMoblie() {
    setNavbarMoblie((prevValue) => !prevValue);
  }

  return (
    <nav className='hr__navbar'>
      <div className='hr__logo-container'>
        <img src='./img/logo.png' alt='logo'></img>
        <h1 className='hr__logo-name animation-underline'>HeartRate</h1>
      </div>
      <ul className={navbarMoblie ? 'hr__nav-item active' : 'hr__nav-item'}>
        <Link to='/news' className='hr__nav-link animation-underline'>
          News
        </Link>
        <Link to='/profile' className='hr__nav-link animation-underline'>
          Activities
        </Link>
        <Link
          to='/login'
          className='hr__nav-link animation-underline'
          onClick={logOut}
        >
          Log out
        </Link>
      </ul>
      <div className='hr__nav-moblie' onClick={toggleNavbarMoblie}>
        {navbarMoblie ? <IoCloseSharp /> : <GiHamburgerMenu />}
      </div>
    </nav>
  );
}

export default Navbar;
