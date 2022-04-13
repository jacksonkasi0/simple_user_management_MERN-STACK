import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import userReducer from './store/reducer/user';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Account from './Pages/Account/Account';
import Users from './Pages/Users/Users';

import PrivateRoute from './components/PrivateRoute';
import Verify from './Pages/Verify/Verify';

const rootReducer = combineReducers({
  auth: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/verify/:token" element={<Verify />} />
          <Route path='/account' element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/signup' element={<PrivateRoute />}>
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/users' element={<PrivateRoute />}>
            <Route path='/users' element={<Users />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
