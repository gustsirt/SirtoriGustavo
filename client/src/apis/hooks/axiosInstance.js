import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VITE_BACKEND_URL,
  timeout: 10000, // tiempo de espera máximo de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para manejar tokens, etc., si es necesario
axiosInstance.interceptors.request.use((config) => {
  // Configurar autenticación, etc.
  return config;
});

export default axiosInstance;

