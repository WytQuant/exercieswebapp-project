import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

const Login = () => {
  const { getUser } = useContext(Context);
  const navigate = useNavigate();

  const [logInData, setLogInData] = useState({
    email: '',
    password: '',
  });

  // get data from inputed from
  const getData = ({ target }) => {
    const { name, value } = target;
    setLogInData({ ...logInData, [name]: value });
  };

  // submit form and send our data to backend then storing into database
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      data: {
        ...logInData,
      },
      withCredentials: true,
      url: 'https://heartrate-backend.vercel.app/users/login',
    })
      .then(async (res) => {
        // console.log(res);

        if (res.data === 'Successfully Authenticated') {
          await getUser();
          await Swal.fire({
            icon: 'success',
            title: 'Sign in successfully!',
            text: 'Welcome to HeartRate!',
          });

          setLogInData({
            email: '',
            password: '',
          });
          navigate('/news');
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.data,
          });

          setLogInData({
            email: '',
            password: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    Swal.fire({
      title: 'Please wait a second, system is authenticating your account...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  return (
    <div className='hr__loginForm-container'>
      <div className='hr__loginForm-logo'>
        <img src='./img/logo.png' alt='logo' />
        <h1>HEART RATE</h1>
      </div>
      <div className='hr__loginForm-input'>
        <h2 className='hr__loginTitle'>Sign in :</h2>
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
          <button type='submit' className={'hr__btn-signin'}>
            Sign In
          </button>
        </form>
        <div className='hr__signup'>
          <Link className='hr__signup-btn' to='/signup'>
            Sign up HeartRate for free!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
