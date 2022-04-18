import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { Context } from "../../Context/Context";

const Login = () => {
  const { getUser } = useContext(Context);

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // get data from inputed from
  const getData = ({ target }) => {
    const name = target.name;
    const inputValue = target.value;

    return setLogInData((prevValue) => ({
      ...prevValue,
      [name]: inputValue,
    }));
  };

  // submit form and send our data to backend then storing into database
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: "POST",
      data: {
        ...logInData,
      },
      withCredentials: true,
      url: "http://localhost:4001/users/login",
    })
      .then((res) => {
        console.log(res);
        getUser();

        alert("Sign in successfully!");

        setLogInData({
          email: "",
          password: "",
        });

        if (res.data === "Successfully Authenticated") {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='hr__loginForm-container'>
      <div className='hr__loginForm-logo'>
        <img src='./img/logo.png' alt='logo' />
        <p>HEART RATE - Making your tracking exercise easier.</p>
      </div>
      <div className='hr__loginForm-input'>
        <h2 className='hr__loginTitle'>Login :</h2>
        <form className='hr__loginForm' onSubmit={handleSubmit}>
          <input
            id='hr__email'
            type='email'
            placeholder='Email'
            name='email'
            value={logInData.email}
            onChange={getData}
          />
          <input
            id='hr__password'
            type='password'
            placeholder='Password'
            name='password'
            value={logInData.password}
            onChange={getData}
          />
          <button type='submit' className='hr__btn-signin'>
            Sign In
          </button>
        </form>
        <div className='hr__signUp-forgot'>
          <button className='hr__forgotPassword'>Forgotten password?</button>
          <p className='hr__saperate'> - </p>
          <Link className='hr__signUp' to='/signup'>
            Sign up for Heart Rate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
