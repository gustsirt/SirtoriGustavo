// api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000*10, // Tiempo de espera máximo de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el Bearer Token si está disponible
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // O usa otra fuente para obtener el token

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
