import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import PostPage from './pages/PostPage';
import AlbumPage from './pages/AlbumPage';
import PostDetailsPage from './pages/PostDetailsPage';
import AlbumDetailsPage from './pages/AlbumDetailsPage';
import { AuthProvider } from './AuthContext';
import { PrivateRoute, PublicRoute } from './Routes';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/profile/:id" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path="/posts" element={<PrivateRoute><PostPage /></PrivateRoute>} />
          <Route path="/albums" element={<PrivateRoute><AlbumPage /></PrivateRoute>} />
          <Route path="/post/:id" element={<PrivateRoute><PostDetailsPage /></PrivateRoute>} />
          <Route path="/album/:id" element={<PrivateRoute><AlbumDetailsPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
