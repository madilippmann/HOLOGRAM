import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import '../SignUpPage'
import logo from '../../static/hologram-logo.png'
export default function LoginPage() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, rgba(122,123,255,1) 12%, rgba(255,201,181,1) 91%)";
    document.body.style.minHeight = "100vh"
    document.body.style.display = "flex"
    document.body.style.justifyContent = "center"
    document.body.style.alignItems = "center"
    document.body.style.width = "100vw"
    return () => {
      document.body.style.backgroundColor = "rgb(252, 248, 247)";
      document.body.style.background = "rgb(252, 248, 247)";
      document.body.style.minHeight = "1200px"

    };
  }, []);


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const loginDemoUser = async () => {
    await dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <div className='signup-login-container'>
      <div className='signup-login-form-container'>
        <form onSubmit={onLogin} className='signup-login-form'>
          <div className='logo-title-container'>
            <img id='signup-login-logo' src={logo} alt='HOLOGRAM logo' />
            <h1><span style={{ color: 'var(--color-purple)' }}>holo</span><span style={{ color: 'rgb(215, 155, 134)' }}>gram</span></h1>
          </div>

          <div>
            {errors.map((error, ind) => (
              <div className='error-styling' key={ind}>{error.split(': ')[1]}</div>
            ))}
          </div>
          <div className='signup-login-input-container'>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              className='signup-login-input'
              onChange={updateEmail}
              autoComplete='new-password'
            />
          </div>
          <div className='signup-login-input-container'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              className='signup-login-input'
              onChange={updatePassword}
            />

          </div>
          <button className='signup-login-submit-button' type='submit'>login</button>
          <div className='demo-and-signup'>
            <Link to='/sign-up'>
              <p className='login-link'>
                sign up
              </p>
            </Link>
            <button className='demo-user-button' type='button' onClick={loginDemoUser}>demo</button>

          </div>
        </form>
      </div>
    </div>
  );
};
