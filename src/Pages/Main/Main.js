import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-web";
import animate from "lottie-web";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Main.css";
import NavbarMain from "../../Components/NavbarMain/NavbarMain";
import Footer from "../../Components/Footer/Footer";

const Main = () => {
  const headerAnimation = useRef(null);
  const secondAnimation = useRef(null);
  const lastAnimation = useRef(null);

  AOS.init({
    duration: 1500,
    easing: "ease",
  });

  useEffect(() => {
    Lottie.loadAnimation({
      container: headerAnimation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../animations/53606-heartbeat-icon.json"),
    });
    animate.setSpeed(0.5);
    return () => {
      Lottie.destroy();
    };
  }, []);

  useEffect(() => {
    Lottie.loadAnimation({
      container: secondAnimation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../animations/9810-notes.json"),
    });
    animate.setSpeed(1);
    return () => {
      Lottie.destroy();
    };
  }, []);

  useEffect(() => {
    Lottie.loadAnimation({
      container: lastAnimation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../animations/69292-news.json"),
    });
    animate.setSpeed(0.5);
    return () => {
      Lottie.destroy();
    };
  }, []);

  return (
    <>
      <NavbarMain />
      <div id='header-top' className='hr__main-section'>
        <div className='hr__header-content' data-aos='fade-down'>
          <div className='hr__content'>
            <h1>Why HeartRate ?</h1>
            <p>
              HeartRate app helps you record and tracking your activities.
              Moreover, we will also provide other features such as Recommend
              news to you as well.
            </p>
            <div className='header-signin-signup'>
              <Link to='/login' className='hr__header-btn'>
                Sign in
              </Link>
              <Link to='/signup' className='hr__header-btn'>
                Sign up
              </Link>
            </div>
          </div>
          <div
            className='hr__animation header-animation'
            ref={headerAnimation}
          ></div>
        </div>
        <div className='hr__second-content'>
          <div
            className='hr__animation second-animation'
            data-aos='fade-right'
            ref={secondAnimation}
          ></div>
          <div className='hr__content' data-aos='fade-left'>
            <h1>Record</h1>
            <p>
              In HeartRate, you can record such as your activities name,
              description, time that you spend for activities, and so on.
            </p>
          </div>
        </div>
        <div className='hr__last-content'>
          <div className='hr__content' data-aos='fade-right'>
            <h1>Fitness and Nutrition News</h1>
            <p>
              We provide up to date and reliability the news regarding Fitness
              and Nutrition for you which was checked by Fitness and Nutrition
              spcailist.
            </p>
          </div>
          <div
            className='hr__animation last-animation'
            data-aos='fade-left'
            ref={lastAnimation}
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
