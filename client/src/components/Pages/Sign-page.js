import React, { Fragment } from 'react';

import SignIn from '../Sign/Sign-in';
import SignUp from '../Sign/Sign-up';

import '../scss/Pages.style.scss';

const SignPage = () => {
  return (
    <Fragment>
      <h1>
        <i className='fas fa-user-check'></i> SIGN IN or SIGN UP
      </h1>
      <div className='sign-body'>
        <SignIn />
        <SignUp />
      </div>
    </Fragment>
  );
};

export default SignPage;
