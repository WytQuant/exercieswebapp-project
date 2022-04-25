import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = { username: '', email: '', password: '' };
  const [signUpData, setSignUpData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  // get data from inputed from
  const getData = ({ target }) => {
    const { name, value } = target;
    setFormErrors(validate(signUpData));
    setSignUpData({ ...signUpData, [name]: value.trim() });
    const notFillout = Object.values(formErrors).some(
      (error) => error.split(' ')[2] === 'required!'
    );
    if (!notFillout) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  // submit form and send our data to backend then storing into database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        data: {
          ...signUpData,
        },
        withCredentials: true,
        url: 'https://heartrate-backend.vercel.app/users/signup',
      });
      console.log(response);
      console.log(response.data);
      await Swal.fire(
        'Sign up successful!',
        'Welcome to HeartRate world!',
        'success'
      );

      setSignUpData({
        username: '',
        email: '',
        password: '',
      });

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; /* eslint-disable-line */
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; /* eslint-disable-line */
    if (!values.username) {
      errors.username = 'Username is required!';
    } else if (values.username.length < 4 && values.username.length > 0) {
      errors.username = 'Username must more than 4 character.';
    }

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regexEmail.test(values.email)) {
      errors.email = 'Email format: example@example.com';
    }

    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (!regexPassword.test(values.password)) {
      errors.password =
        'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
    }

    return errors;
  };

  return (
    <div className='hr__signupForm-container'>
      <div className='hr__signupForm-logo'>
        <img src='./img/logo.png' alt='logo' />
        <h1>HEART RATE</h1>
      </div>
      <div className='hr__signupForm-input'>
        <h2 className='hr__signupTitle'>Create account :</h2>
        <form className='hr__signupForm' onSubmit={handleSubmit}>
          <input
            id='hr__username'
            type='text'
            placeholder='Username'
            name='username'
            value={signUpData.username}
            onChange={getData}
          />
          <p className='validate-error'>{formErrors.username}</p>
          <input
            id='hr__email'
            type='email'
            placeholder='Email'
            name='email'
            value={signUpData.email}
            onChange={getData}
          />
          <p className='validate-error'>{formErrors.email}</p>
          <input
            id='hr__password'
            type='password'
            placeholder='Password'
            name='password'
            value={signUpData.password}
            onChange={getData}
          />
          <p className='validate-error'>{formErrors.password}</p>
          <button
            disabled={!canSubmit}
            type='submit'
            className={canSubmit ? 'hr__btn-signup' : 'cannot-signup'}
          >
            Sign up
          </button>
        </form>
        <div className='hr__signup-have-account'>
          <p>Already Have an account</p>
          <Link className='hr__forgotpassword' to='/login'>
            Login?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
