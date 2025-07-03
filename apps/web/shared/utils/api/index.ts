import axios from 'axios';

const $api = axios.create({
  baseURL: 'http://loalhost:3001',
  withCredentials: true,
});

export default $api;
