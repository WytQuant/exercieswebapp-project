import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className='hr__footer-section'>
      <div className='hr__footer'>
        <div className='hr__band'>
          <img src='./img/logo.png' alt='brand-logo' />
          <a href='#header-top' className='brand-title animation-underline'>
            HeartRate
          </a>
        </div>
        <div className='contact-info'>
          <p>About Us</p>
          <p>Careers</p>
        </div>
        <div className='contact-info'>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Terms of Use</p>
        </div>
        <div className='contact-info contact-link'>
          <a
            href='https://github.com/WytQuant'
            rel='noreferrer'
            target='_blank'
          >
            <FaGithub />
          </a>
          <a
            href='https://www.linkedin.com/in/wytquant/'
            rel='noreferrer'
            target='_blank'
          >
            <FaLinkedin />
          </a>
          <a
            href='mailto:wittawas.ks@gmail.com'
            rel='noreferrer'
            target='_blank'
          >
            <MdEmail />
          </a>
        </div>
      </div>
      <div className='copy-right'>
        <p>©2022 Heart Rate. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
