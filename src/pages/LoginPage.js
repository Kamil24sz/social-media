import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // upewnij się, że ścieżka do pliku AuthContext jest poprawna
import '../App.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    const { username, password } = data;
    const result = login(username, password);

    if (result) {
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register('username')} className="input-field" />
        <label>Password</label>
        <input {...register('password')} className="input-field" type="password" />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="submit-button">Login</button>
      </form>
      <Link to="/register">Don't have account? Register</Link>
    </div>
  );
}

export default LoginPage;
