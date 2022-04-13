import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import { handleUser } from '../../store/action/user';
import { useNavigate } from 'react-router-dom';

import axios from '../../axios';

const Login = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailRef.current.value.trim() || !passwordRef.current.value.trim()) {
      alert('Enter all the details');
      return;
    }
    try {
      const { data } = await axios.post('/api/user/login', {
        password: passwordRef.current.value,
        email: emailRef.current.value,
      });
      emailRef.current.value = '';
      passwordRef.current.value = '';
      localStorage.setItem('loginToken', data.token);
      dispatch(handleUser(data.token));
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='login'>
      <div className='container'>
        <h1>Login</h1>
        <div className='loginContainer'>
          <input ref={emailRef} type='email' placeholder='Enter your Email' />
          <input
            ref={passwordRef}
            type='password'
            placeholder='Enter your password'
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
