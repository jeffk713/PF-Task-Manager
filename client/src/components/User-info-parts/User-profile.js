import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import UtilButton from '../Util-components/Util-button';

import '../scss/Pages.style.scss';

const UserProfileParts = ({ user, profile, deleteAllTasks, deleteUser, history }) => {
  return (
    <div className='user-body'>
      <div className='user-body-picture-container'>
        <div className='user-body-picture'>PROFILE PIC</div>
        <div className='btn btn-lg bg-light' onClick={() => history.push('/profile-edit')}>
          Edit profile
        </div>
      </div>
      <div className='user-body-table table-profile'>
        <div className='user-btn-group'>
          <UtilButton purpose='edit' handleClick={() => history.push('/userinfo-edit')} />
        </div>
        <div className='user-body-table-group group-profile'>
          <strong>Name: </strong> {user.name}
        </div>
        <div className='user-body-table-group group-profile'>
          <strong>Email: </strong> {user.email}
        </div>
        <div className='user-body-table-group group-profile'>
          <strong>Date of birth: </strong>{' '}
          <Moment format='MM/DD/YYYY'>{moment.utc(profile.bday)}</Moment>
        </div>
        <div className='user-body-table-group group-profile'>
          <strong>Occupation: </strong> {profile.occupation}
        </div>
        <div className='user-body-table-group group-profile'>
          <strong>Introduction: </strong> {profile.introduction}
        </div>
        <div className='user-body-table-group group-profile'>
          <strong>Last update: </strong>{' '}
          <Moment format='MM/DD/YYYY'>{user.updatedAt.toString()}</Moment>
        </div>
        <div className='user-body-table-group group-profile'>
          <strong>Joined since: </strong>{' '}
          <Moment format='MM/DD/YYYY'>{user.createdAt.toString()}</Moment>
        </div>
        <div className='user-body-table-group group-profile'>
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

export default UserProfileParts;
