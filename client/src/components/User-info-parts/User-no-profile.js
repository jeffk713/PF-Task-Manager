import React from 'react';
import Moment from 'react-moment';

import UtilButton from '../Util-components/Util-button';

import '../scss/Pages.style.scss';

const UserNoProfileParts = ({ user, deleteAllTasks, deleteUser, history }) => {
  return (
    <div className='user-body'>
      <div className='user-body-table'>
        <div className='user-btn-group'>
          <UtilButton purpose='edit' handleClick={() => history.push('/userinfo-edit')} />
        </div>
        <div className='user-body-table-group'>
          <strong>Name: </strong> {user.name}
        </div>
        <div className='user-body-table-group'>
          <strong>Email: </strong> {user.email}
        </div>
        <div className='user-body-table-group'>
          <strong>Last update: </strong>{' '}
          <Moment format='MM/DD/YYYY'>{user.updatedAt.toString()}</Moment>
        </div>
        <div className='user-body-table-group'>
          <strong>Joined since: </strong>{' '}
          <Moment format='MM/DD/YYYY'>{user.createdAt.toString()}</Moment>
        </div>
        <div className='user-body-table-group'>You haven't set up profile</div>
        <div className='user-body-table-group'>
          <div className='btn btn-lg bg-light' onClick={() => {}}>
            Set up profile
          </div>
          <div className='btn btn-lg bg-warning' onClick={() => deleteAllTasks()}>
            Delete All Tasks
          </div>
          <div className='btn btn-lg bg-warning' onClick={() => deleteUser()}>
            Delete User
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNoProfileParts;
