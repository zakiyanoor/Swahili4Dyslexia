import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  setIsAuth: () => {},
  isLoading: true,
});

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuth(stored);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
} 