import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true'
  );

  const login = (username, password) => {
    // Implementacja rzeczywistej logiki logowania
    const hardcodedUsername = "user";
    const hardcodedPassword = "pass";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setIsLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');
      return true;
    } else {
      return false;
    }
  };

  const registerUser = async (data) => {
    // Implementacja logiki rejestracji użytkownika
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}