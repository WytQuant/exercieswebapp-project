import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-web";
import animate from "lottie-web";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Main.css";
import NavbarMain from "../../Components/NavbarMain/NavbarMain";

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
      animationData: require("../../animations/90021-graph-stats.json"),
    });
    animate.setSpeed(0.5);
    return () => {
      Lottie.destroy();
    };
  }, []);

  return (
    <>
      <NavbarMain />
      <div className='hr__mainSection'>
        <div className='hr__headerContent' data-aos='fade-down'>
          <div className='hr__content'>
            <h1>HEART RATE</h1>
            <h3>Making you record your activities easily.</h3>
            <h3>Why HeartRate ?</h3>
            <p>
              HeartRate app helps you record and tracking your activities.
              Moreover, we will also provide other features such as Recommend
              news and Report to you.
            </p>
            <Link to='/signup' className='hr__headerSignUp'>
              Sign up
            </Link>
          </div>
          <div
            className='hr__animation headerAnimation'
            ref={headerAnimation}
          ></div>
        </div>
        <div className='hr__secondContent'>
          <div
            className='hr__animation secondAnimation'
            data-aos='fade-right'
            ref={secondAnimation}
          ></div>
          <div className='hr__content' data-aos='fade-left'>
            <h1>Record</h1>
            <p>
              In HeartRate, you can record such as your activities name,
              desciption, time that you spend for activities, and so on.
            </p>
          </div>
        </div>
        <div className='hr__lastContent'>
          <div className='hr__content' data-aos='fade-right'>
            <h1>Analytic Report</h1>
            <p>
              All of your statistic about activities' spending time, what are
              the most activities you do at that week? Those statistics will be
              reported at the Analytic Repor section.
            </p>
          </div>
          <div
            className='hr__animation lastAnimation'
            data-aos='fade-left'
            ref={lastAnimation}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Main;
