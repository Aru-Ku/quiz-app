import React, { useState, createContext, useContext } from 'react';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(false);

  const loginUser = () => {
    setUser(true);
  };

  const logoutUser = () => {
    setUser(false);
  };

  return { user, loginUser, logoutUser };
}
