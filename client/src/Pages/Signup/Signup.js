import React, { useState } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux';

const Signup = () => {
  const user = useSelector((state) => state.auth.user.user);

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNo: '',
    address: '',
  });

  const handleSignup = async () => {
    if (
      !userInput.name ||
      !userInput.email ||
      !userInput.password ||
      !userInput.role ||
      !userInput.phoneNo ||
      !userInput.address
    ) {
      alert('Enter all the details');
      return;
    }
    try {
      const { data } = await axios.post('/api/user/signup', userInput, {
        headers: {
          authorization: localStorage.getItem('loginToken'),
        },
      });
      alert(data.msg);
    } catch (error) {
      alert(error.message);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (user.loginType !== 1) {
    return (
      <div>
        <h1>404 Page not found</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Signup</h1>
        <div>
          <input
            name='name'
            value={userInput.name}
            type='text'
            placeholder='Enter your name'
            onChange={handleChange}
          />
          <br />
          <input
            name='email'
            value={userInput.email}
            type='email'
            placeholder='Enter your email'
            onChange={handleChange}
          />
          <br />
          <input
            name='password'
            value={userInput.password}
            type='password'
            placeholder='Enter your password'
            onChange={handleChange}
          />
          <br />
          <input
            name='role'
            value={userInput.role}
            type='text'
            placeholder='Enter your job role'
            onChange={handleChange}
          />
          <br />
          <input
            name='phoneNo'
            value={userInput.phoneNo}
            type='number'
            placeholder='Enter your mobile number'
            onChange={handleChange}
          />
          <br />
          <input
            name='address'
            value={userInput.address}
            type='text'
            placeholder='Enter your address'
            onChange={handleChange}
          />
          <br />
          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
