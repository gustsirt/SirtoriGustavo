

export const useAuth = () => {
  function isAuthenticated() {return !!localStorage.getItem("token")}

  const signIn = (token: string) => localStorage.setItem("token", token);

  const signOut = () => localStorage.removeItem("token");

  return { signIn, signOut, isAuthenticated };
};

export type AuthContext = ReturnType<typeof useAuth>;