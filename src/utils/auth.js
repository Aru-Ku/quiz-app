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
  const check = () => {
    const type = localStorage.getItem('userType');
    const data = localStorage.getItem('userDetails');
    if (type && data) return { type, ...{ data: JSON.parse(data) } };
  };
  const [user, setUser] = useState(check() || {});

  // type, data

  const loginUser = data => {
    localStorage.setItem('userType', data.type);
    const details = JSON.stringify(data.data);
    localStorage.setItem('userDetails', details);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userDetails');
    setUser({});
  };

  return { user, loginUser, logout };
}
