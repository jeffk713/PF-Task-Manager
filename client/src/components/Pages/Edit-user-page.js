import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../../redux/actions/user-action';

import UtilButton from '../Util-components/Util-button';

import '../scss/Sign.style.scss';

const EditUserPage = ({ userState: { user, token }, updateUser }) => {
  const INITIAL_DATA = {
    name: user.name,
    email: user.email,
  };
  const [formData, setFormData] = useState(INITIAL_DATA);
  const { name, email } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser({ token, name, email });
  };

  return (
    <Fragment>
      <div className='sign-header'>
        <h1>
          <i className='fas fa-user-check'></i> EDIT USER INFORMATION
        </h1>
      </div>
      <div className='signup-container edit-user-container'>
        <form className='signup-form'>
          <div className='form-group edit-user-btn-group'>
            <UtilButton purpose='back' pushUrl='/userinfo' />
          </div>
          <div className='form-group'>
            <input
              className='form-input'
              name='name'
              type='text'
              value={name}
              onChange={handleChange}
              required
              placeholder='New Name'
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
              placeholder='New Email'
            />
          </div>
          <div className='form-group'>
            <div className='btn bg-main btn-lg' onClick={handleSubmit}>
              SAVE
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: ({ token, name, email }) => dispatch(updateUser({ token, name, email })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
