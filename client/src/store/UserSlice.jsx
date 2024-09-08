// * Store de Usuarios

const createUserSlice = (set, get) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  getToken: () => localStorage.getItem('token') || null,
  login: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, currentUser: null, isAuthenticated: false });
  },

  currentUser: null,
  setUser: (user) => set({ currentUser: user }),
})

export default createUserSlice