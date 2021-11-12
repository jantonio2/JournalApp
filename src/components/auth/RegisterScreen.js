import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeError, setError } from '../../actions/ui';
import { useForm } from './../../hooks/useForm';
import validator from 'validator';

export const RegisterScreen = () => {
  
  const dispatch = useDispatch();
  const initialState = {
    name: 'Antonio',
    email: 'antonio@gmail.com',
    password: '123456',
    password2: '123456'
  };
  const [formValues, handleInputChange] = useForm(initialState);
  const {name, email, password, password2} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if(isFormValid()) {
      console.log('Formulario correcto');
    }
  };

  const isFormValid = () => {

    if(name.trim().length === 0){
      dispatch(setError('Name is required'));
      return false;
    } else  if(!validator.isEmail(email)){
      dispatch(setError('Email is not valid'));
      return false;
    } else if(password !== password2 || password.length < 5){
      dispatch(setError('Password should be at least 6 characters and match each other'));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <div className="auth__alert-error">
        Hola Mundo
      </div>

      <form onSubmit={handleRegister}>
        <input 
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        <input 
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input 
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <input 
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>      
    </>
  );
};
