import axios from 'axios';

const END_POINT = process.env.REACT_APP_BACKEND_URL;

console.log(END_POINT);

const instance = axios.create({
  baseURL: END_POINT,
});

export default instance;
