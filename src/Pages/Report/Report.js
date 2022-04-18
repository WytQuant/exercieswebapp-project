import React from "react";
import "./Report.css";
import Navbar from "../../Components/Navbar/Navbar";
import DoughnutChart from "../../Charts/Doughnut/Doughnut";
import AOS from "aos";
import "aos/dist/aos.css";

const Report = () => {
  AOS.init({
    duration: 1000,
    easing: "ease",
  });

  return (
    <>
      <Navbar />
      <div className='hr__report-section'>
        <div className='hr__homeheader report-background'>
          <div className='hr__homeheader-content' data-aos='fade-right'>
            <p>Report</p>
            <h1 className='animation-underline'>Analytic report for you.</h1>
          </div>
        </div>
        <div className='doughnut-chart'>
          <DoughnutChart />
        </div>
      </div>
    </>
  );
};

export default Report;
