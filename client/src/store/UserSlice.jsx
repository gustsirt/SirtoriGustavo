// * Store de Usuarios
import axiosInstance from "../config/axiosInstance";
import { jwtDecode  } from 'jwt-decode';

const createUserSlice = (set, get) => ({
  isAuthenticated: false,
  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodifica el token
        const currentTime = Date.now() / 1000; // Obtiene el tiempo actual en segundos
    
        // Verifica si el token ha expirado
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          set({ isAuthenticated: true });
          return true;
        } else {
          set({ isAuthenticated: false });
          return false;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        set({ isAuthenticated: false });
        return false;
      }
    } else {
      set({ isAuthenticated: false });
      return false;
    }
  },

  // Obtiene el token desde localStorage
  getToken: () => localStorage.getItem('token') || null,

  // Almacena el token y marca como autenticado
  login: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  // Elimina el token y desautentica al usuario
  logout: () => {
    localStorage.removeItem('token');
    set({ currentUser: null, isAuthenticated: false });
  },

  currentUser: null,
  currentUserName:null,

  // Establece el usuario actual
  setUser: (user) => set({ currentUser: user }),

  // Obtiene el usuario actual de la API
  getUser: async () => {
    try {
      const user = await axiosInstance("/v1/users/current");

      if (user.status === 200 && !user.data.isError) {
        set({
          currentUser: user.data.data,
          currentUserName: user.data.data.username,
        });
      } else {
        console.error('Error fetching user data:', user.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during API call:', error.message || error);
    }
  }
})

export default createUserSlice