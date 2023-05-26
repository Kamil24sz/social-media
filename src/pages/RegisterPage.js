import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password'), null])
    .required()
});

function RegisterPage() {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { isLoggedIn, registerUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    await registerUser(data);
    navigate('/login');
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <Controller 
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} className="input-field" />}
        />
        <p className={`error-message ${errors.email ? 'visible' : ''}`}>{errors.email?.message}</p>

        <label>Password</label>
        <Controller 
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} type="password" className="input-field" />}
        />
        <p className={`error-message ${errors.password ? 'visible' : ''}`}>{errors.password?.message}</p>

        <label>Repeat Password</label>
        <Controller 
          name="repeatPassword"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} type="password" className="input-field" />}
        />
        <p className={`error-message ${errors.repeatPassword ? 'visible' : ''}`}>{errors.repeatPassword?.message}</p>

        <button type="submit" className="submit-button">Register</button>
      </form>
      <Link to="/login">Have account already? Log in</Link>
    </div>
  );
}

export default RegisterPage;
