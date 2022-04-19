import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { Context } from "../../Context/Context";

const Login = () => {
  const { getUser } = useContext(Context);
  const navigate = useNavigate();

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([false, false]);
  const [canSubmit, setCanSubmit] = useState(false);

  // get data from inputed from
  const getData = ({ target }) => {
    const { name, value } = target;
    setLogInData({ ...logInData, [name]: value.trim() });
    setFormErrors(validate(logInData));
  };

  useEffect(() => {
    const fillout = formErrors.some((value) => value === false);
    if (fillout) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [formErrors]);

  // submit form and send our data to backend then storing into database
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        ...logInData,
      },
      withCredentials: true,
      url: "http://localhost:4001/users/login",
    })
      .then((res) => {
        console.log(res);

        if (res.data === "Successfully Authenticated") {
          getUser();
          alert("Sign in successfully!");

          setLogInData({
            email: "",
            password: "",
          });
          navigate("/home");
        } else {
          alert(res.data);
          setLogInData({
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (values) => {
    const errors = [];
    if (values.email.length === 0) {
      errors[0] = false;
    } else if (values.email.length > 0) {
      errors[0] = true;
    }

    if (values.password.length === 0) {
      errors[1] = false;
    } else if (values.password.length > 0) {
      errors[1] = true;
    }

    return errors;
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
          <button
            disabled={!canSubmit}
            type='submit'
            className={canSubmit ? "hr__btn-signin" : "cannot-signin"}
          >
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
