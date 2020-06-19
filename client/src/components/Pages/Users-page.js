import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import UserList from '../User-list/User-list';

import '../scss/Task-User-list.style.scss';

const UsersPage = ({ isAuth, users }) => {
  if (!isAuth) return <Redirect to='/' />;
  return (
    <Fragment>
      <h1>
        <i className='fas fa-users'></i> USERS
      </h1>
      <div className='user-table'>
        <div className='user-table-head'>
          <div>Username</div>
          <div>Email</div>
        </div>
        {users.length > 0 ? (
          users.map(({ _id, ...others }) => <UserList key={_id} id={_id} {...others} />)
        ) : (
          <div>no user yet</div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
  users: state.userReducer.users,
});

export default connect(mapStateToProps)(UsersPage);
