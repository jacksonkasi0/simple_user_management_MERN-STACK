import axios from '../../axios';

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  };
};

export const handleUser = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/user/get/data', {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};
