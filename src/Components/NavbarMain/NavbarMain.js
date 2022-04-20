import React from "react";
import "./NavbarMain.css";

function NavbarMain() {
  return (
    <nav className='hr__navbar-main'>
      <div className='hr__logo-container-main'>
        <img src='./img/logo.png' alt='logo'></img>
        <h1 className='hr__logo-name-main  animation-underline'>HeartRate</h1>
      </div>
    </nav>
  );
}

export default NavbarMain;
