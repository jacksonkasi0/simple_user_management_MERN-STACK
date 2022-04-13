import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.auth);
  console.log(user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('loginToken');
    // window.location.reload();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>Home</h1>
      {user.user !== null ? (
        <div>
          <a href="/users">users</a>
          <button onClick={logout}>Logout</button>
        </div>

      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Home;
