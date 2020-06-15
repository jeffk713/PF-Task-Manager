import React from 'react';
import { connect } from 'react-redux';

import UtilPage from './Util-page';

const HomePage = ({ isAuth }) => {
  console.log(isAuth);
  return (
    <div className='home'>
      {isAuth ? (
        <UtilPage purpose='authStart' pushUrl='/task-add' />
      ) : (
        <UtilPage purpose='noAuthStart' pushUrl='/sign' />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
});

export default connect(mapStateToProps)(HomePage);
