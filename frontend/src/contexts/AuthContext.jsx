// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { saveToken, getToken, removeToken, isLoggedIn } from "../services/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(getToken());

  useEffect(() => {
    setUserToken(getToken());
  }, []);

  const loginUser = (token) => {
    saveToken(token);
    setUserToken(token);
  };

  const logoutUser = () => {
    removeToken();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ token: userToken, loginUser, logoutUser, isAuthenticated: isLoggedIn() }}>
      {children}
    </AuthContext.Provider>
  );
}
