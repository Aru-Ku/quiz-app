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
  const [user, setUser] = useState({});
  // type, data

  const loginUser = data => {
    setUser(data);
  };

  const logout = () => {
    setUser({});
  };

  return { user, loginUser, logout };
}
