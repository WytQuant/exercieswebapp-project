import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // get data from inputed from
  const getData = ({ target }) => {
    const name = target.name;
    const inputValue = target.value;

    setSignUpData((prevValue) => ({
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
        ...signUpData,
      },
      withCredentials: true,
      url: "http://localhost:4001/users/signup",
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("You have already created account!!");
      })
      .catch((err) => console.log(err));

    setSignUpData({
      username: "",
      email: "",
      password: "",
    });

    navigate("/login");
  };

  return (
    <div className='hr__loginForm-container'>
      <div className='hr__loginForm-logo'>
        <img src='./img/logo.png' alt='logo' />
        <p>HEART RATE - Making your tracking exercise easier.</p>
      </div>
      <div className='hr__loginForm-input'>
        <h2 className='hr__loginTitle'>Create account :</h2>
        <form className='hr__loginForm' onSubmit={handleSubmit}>
          <input
            id='hr__username'
            type='text'
            placeholder='Username'
            name='username'
            value={signUpData.username}
            onChange={getData}
          />
          <input
            id='hr__email'
            type='email'
            placeholder='Email'
            name='email'
            value={signUpData.email}
            onChange={getData}
          />
          <input
            id='hr__password'
            type='password'
            placeholder='Password'
            name='password'
            value={signUpData.password}
            onChange={getData}
          />
          <button type='submit' className='hr__btn-signin'>
            Sign up
          </button>
        </form>
        <div className='hr__signUp-forgot'>
          <p>Already Have an account</p>
          <Link className='hr__forgotPassword' to='/login'>
            Login?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
