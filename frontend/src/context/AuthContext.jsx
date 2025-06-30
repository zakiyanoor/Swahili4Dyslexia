 import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  withCredentials: true,
  autoConnect: true,
});

export const AuthContext = createContext({
  isAuth: false,
  setIsAuth: () => {},
  isLoading: true,
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.emit('check_auth');
    socket.on('auth_response', (data) => {
      console.log(data.user);
      setUser(data.user);
      setIsAuth(data.isAuthenticated);
    });

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
