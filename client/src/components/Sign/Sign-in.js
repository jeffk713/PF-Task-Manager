import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signIn } from '../../redux/actions/user-action';

import '../scss/Pages.style.scss';

const INITIAL_DATA = {
  email: '',
  password: '',
};

const SignIn = ({ signIn, isAuth }) => {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  if (isAuth) return <Redirect to='/tasks' />;

  return (
    <div className='signin-container'>
      <div className='signin-title'>
        <h2>SIGN IN</h2>
      </div>
      <form className='form'>
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
          <div className='btn bg-main btn-lg' onClick={handleSubmit}>
            SIGN IN
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
  signIn: (email, password) => dispatch(signIn({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
