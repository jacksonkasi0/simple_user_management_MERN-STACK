import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.auth);
  console.log(user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('loginToken');
    window.location.reload();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const token = localStorage.getItem('loginToken');

  return (
    <div>
      <h1>Home</h1>
      {!token ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <a href='/users'>Users</a>
          <br />
          <br />
          <a href='/signup'>Signup</a>
          <br />
          <br />
          <a href='/account'>Account</a>
          <br />
          <br />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
