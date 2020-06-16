import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import UtilPage from '../Util-components/Util-page';
import UtilButton from '../Util-components/Util-button';

import { deleteAllTasks } from '../../redux/actions/task-action';
import { deleteUser } from '../../redux/actions/user-action';

import '../scss/Pages.style.scss';

const UserPage = ({ userState: { user, isAuth }, deleteAllTasks, deleteUser, history }) => {
  return (
    <Fragment>
      <div className='user-header'>
        <h1>
          <i className='fas fa-user-cog'></i> USER INFORMATION
        </h1>
      </div>

      {isAuth ? (
        <div className='user-body'>
          <div className='user-body-table'>
            <div className='user-body-table-group user-btn-group'>
              <UtilButton purpose='edit' handleClick={() => history.push('/userinfo-edit')} />
            </div>
            <div className='user-body-table-group'>
              <strong>Name: </strong> {user.name}
            </div>
            <div className='user-body-table-group'>
              <strong>Eamil: </strong> {user.email}
            </div>
            <div className='user-body-table-group'>
              <strong>Last update: </strong>{' '}
              <Moment format='MM/DD/YYYY'>{user.updatedAt.toString()}</Moment>
            </div>
            <div className='user-body-table-group'>
              <strong>Joined since: </strong>{' '}
              <Moment format='MM/DD/YYYY'>{user.createdAt.toString()}</Moment>
            </div>
            <div className='user-body-table-group'>
              <div className='btn btn-lg bg-warning' onClick={() => deleteAllTasks()}>
                Delete All Tasks
              </div>
              <div className='btn btn-lg bg-warning' onClick={() => deleteUser()}>
                Delete User
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UtilPage purpose='guest' />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAllTasks: () => dispatch(deleteAllTasks()),
  deleteUser: () => dispatch(deleteUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPage));
