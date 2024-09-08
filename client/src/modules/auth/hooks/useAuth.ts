

export const useAuth = () => {

  const isAuthenticated = () => {return !!localStorage.getItem("token")};
  const getToken = () => localStorage.getItem("token");

  const signIn = (token: string) => localStorage.setItem("token", token);
  const signOut = () => localStorage.removeItem("token");

  return { signIn, signOut, isAuthenticated, getToken };
};

export type AuthContext = ReturnType<typeof useAuth>;