import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2045/api/student',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;