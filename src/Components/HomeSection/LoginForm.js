import React from 'react';
import './LoginFormElements.css';
import useForm from './useForm';
import PropTypes from 'prop-types';
const LoginForm = ({ submitForm }) => {
    const { handleChange, handleSubmit, values } = useForm(
      submitForm
    );
  
  return (
    <div className='form-content'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <div className='form-inputs'>
          <label className='form-label' htmlFor='idoc'>idoc</label>
          <input
            id='idoc'
            className='form-input'
            type='text'
            name='idoc'
            placeholder='Enter your username'
            value={values.idoc}
            onChange={handleChange}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label' htmlFor='ndoc'>ndoc</label>
          <input
            id='ndoc'
            className='form-input'
            type='text'
            name='ndoc'
            placeholder='Enter your username'
            value={values.ndoc}
            onChange={handleChange}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label' htmlFor='contraseña'>Password</label>
          <input
            id='contraseña'
            className='form-input'
            type='password'
            name='contraseña'
            placeholder='Enter your Password'
            value={values.contraseña}
            onChange={handleChange}
          />
        </div>
        <button className='form-input-btn' type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  submitForm: PropTypes.func,
};

export default LoginForm;