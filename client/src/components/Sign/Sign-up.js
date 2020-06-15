import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setAlert } from '../../redux/actions/alert-action';
import { signUp } from '../../redux/actions/user-action';

import '../scss/Sign.style.scss';

const INITIAL_DATA = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

const SignUp = ({ setAlert, signUp, isAuth }) => {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const { name, email, password, password2 } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== password2) return setAlert('Passwords do not match', 'red');

    signUp(name, email, password);
  };

  if (isAuth) return <Redirect to='/tasks' />;

  return (
    <div className='signup-container'>
      <div className='signup-title'>
        <h2>SIGN UP</h2>
      </div>
      <form className='signup-form'>
        <div className='form-group'>
          <input
            className='form-input'
            name='name'
            type='text'
            value={name}
            onChange={handleChange}
            required
            placeholder='Name'
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            name='email'
            type='email'
            value={email}
            onChange={handleChange}
            required
            placeholder='Email'
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            name='password'
            type='password'
            value={password}
            onChange={handleChange}
            required
            placeholder='Password'
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            name='password2'
            type='password'
            value={password2}
            onChange={handleChange}
            required
            placeholder='Confirm Password'
          />
        </div>
        <div className='form-group'>
          <div className='btn bg-main btn-lg' onClick={handleSubmit}>
            SIGN UP
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (message, color) => dispatch(setAlert(message, color)),
  signUp: (name, email, password) => dispatch(signUp({ name, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
