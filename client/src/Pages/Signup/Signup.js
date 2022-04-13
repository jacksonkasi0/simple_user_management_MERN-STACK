import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { handleUser, setUser } from '../../store/action/user';
import axios from '../../axios';

const Signup = () => {
  const user = useSelector((state) => state.auth.user);

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNo: '',
    address: '',
  });

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    if (
      !userInput.name ||
      !userInput.email ||
      !userInput.password ||
      !userInput.role ||
      !userInput.phoneNo ||
      !userInput.address
    ) {
      return alert('Please fill all the fields');
    }

    try {
      const { data } = await axios.post('/api/user/signup', userInput, {
        headers: {
          authorization: localStorage.getItem('loginToken'),
        },
      });
      alert(data.message);
    } catch (err) {
      alert(err.message);
    }

    setUserInput({
      name: '',
      email: '',
      password: '',
      role: '',
      phoneNo: '',
      address: '',
    });
  };

  if (user.loginType !== 1) {
    return <div>404 page not found</div>;
  }

  return (
    <div className='signUp'>
      <div className='container'>
        <h1>Signup</h1>
        <p>{user.loginType}</p>
        <div className='signUpContainer'>
          <input
            type='text'
            name='name'
            value={userInput.name}
            placeholder='Enter your Name'
            onChange={handleChange}
          />
          <br />
          <input
            type='text'
            name='email'
            value={userInput.email}
            placeholder='Enter your Email'
            onChange={handleChange}
          />
          <br />
          <input
            type='password'
            name='password'
            value={userInput.password}
            placeholder='Enter your Password'
            onChange={handleChange}
          />
          <br />
          <input
            type='text'
            name='role'
            value={userInput.role}
            placeholder='Enter your job Role'
            onChange={handleChange}
          />
          <br />

          <input
            type='number'
            name='phoneNo'
            value={userInput.phoneNo}
            placeholder='Enter your Phone No'
            onChange={handleChange}
          />
          <br />

          <input
            type='text'
            name='address'
            value={userInput.address}
            placeholder='Enter your Address'
            onChange={handleChange}
          />
          <br />

          <button onClick={handleSignUp}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
