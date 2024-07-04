
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000, // Timeout duration in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.REACT_APP_JWT_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

