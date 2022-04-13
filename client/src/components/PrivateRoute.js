import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUser } from '../store/action/user';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    if (!user) {
      let token = localStorage.getItem('loginToken');
      if (token) {
        dispatch(handleUser(token));
      }
    }
    setTimeout(() => {
      setIsToken(true);
    }, 1000);
  }, []); 

  if (isToken) {
    return user ? <Outlet /> : <Navigate to='/login' />;
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default PrivateRoute;
