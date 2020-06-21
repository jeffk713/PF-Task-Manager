import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../../redux/actions/user-action';

import '../scss/Navbar.style.scss';

const Navbar = ({ isAuth, logOut, user }) => {
  return (
    <nav className='navbar'>
      <div className='navbar-group'>
        <h1>
          <Link className='navbar-link' to={'/'}>
            <i className='fas fa-clipboard'></i> Task Manager
          </Link>
        </h1>
      </div>
      <div className='navbar-group'>
        {isAuth && (
          <Fragment>
            <Link className='navbar-link sm' to={`/chat?username=${user.name}&room=room`}>
              <i className='fas fa-comments hide-lg'></i>
              <strong className='hide-sm'>Chat</strong>
            </Link>
          </Fragment>
        )}
        <Link className='navbar-link sm' to='/tasks'>
          <i className='fas fa-calendar-alt hide-lg'></i>
          <strong className='hide-sm'>Tasks</strong>
        </Link>
        {isAuth && (
          <Link className='navbar-link sm' to='/users'>
            <i className='fas fa-users hide-lg'></i>
            <strong className='hide-sm'>Users</strong>
          </Link>
        )}
        <Link className='navbar-link sm' to='/userinfo'>
          <i className='fas fa-user-cog hide-lg'></i>
          <strong className='hide-sm'>My Info</strong>
        </Link>
        {isAuth ? (
          <div className='navbar-link sm' onClick={logOut}>
            <i className='fas fa-sign-out-alt hide-lg'></i>
            <strong className='hide-sm'>Sign Out</strong>
          </div>
        ) : (
          <Link className='navbar-link sm' to='/sign'>
            <i className='fas fa-sign-in-alt hide-lg'></i>
            <strong className='hide-sm'>Sign In</strong>
          </Link>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
