import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Jeśli użytkownik nie jest zalogowany, przekieruj go na stronę logowania
  if (!isLoggedIn) {
    navigate('/');
    return null;
  }

  // Jeśli użytkownik jest zalogowany, pozwól mu na dostęp do komponentu
  return children;
};

const PublicRoute = ({ children }) => {

  // Jeśli użytkownik nie jest zalogowany, pozwól mu na dostęp do komponentu
  return children;
};

export { PrivateRoute, PublicRoute };
