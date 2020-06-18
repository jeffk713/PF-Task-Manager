import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../../redux/actions/user-action';

import '../scss/Navbar.style.scss';

const Navbar = ({ isAuth, logOut }) => {
  return (
    <nav className='navbar'>
      <div className='navbar-group'>
        <h1>
          <Link className='navbar-link' to='/'>
            <i className='fas fa-clipboard'></i> Task Manager
          </Link>
        </h1>
      </div>
      <div className='navbar-group'>
        {isAuth && (
          <Link className='navbar-link sm' to='/task-add'>
            <strong>Add</strong>
          </Link>
        )}
        <Link className='navbar-link sm' to='/tasks'>
          <strong>Tasks</strong>
        </Link>
        {isAuth && (
          <Link className='navbar-link sm' to='/users'>
            <strong>Users</strong>
          </Link>
        )}
        <Link className='navbar-link sm' to='/userinfo'>
          <strong>Me</strong>
        </Link>
        {isAuth ? (
          <div className='navbar-link sm' onClick={logOut}>
            <strong>Sign Out</strong>
          </div>
        ) : (
          <Link className='navbar-link sm' to='/sign'>
            <strong>Sign In</strong>
          </Link>
        )}
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
