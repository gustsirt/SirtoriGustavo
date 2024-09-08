// * Store de Usuarios

import axiosInstance from "../config/axiosInstance";

const createUserSlice = (set, get) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  getToken: () => localStorage.getItem('token') || null,

  login: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ currentUser: null, isAuthenticated: false });
  },

  currentUser: null,
  setUser: (user) => set({ currentUser: user }),

  getUser: async () => {
    const user = await axiosInstance("/v1/users/current")
    
    if (!user.data.isError) {
      set({ currentUser: user.data.data })
    } else {
      console.error('Error fetching user data:', user.data.message);
    }
  }
})

export default createUserSlice