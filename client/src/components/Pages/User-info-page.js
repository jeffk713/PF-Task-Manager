import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UtilPage from '../Util-components/Util-page';
import UserProfileParts from '../User-info-parts/User-profile';
import UserNoProfileParts from '../User-info-parts/User-no-profile';

import { getMyProfile } from '../../redux/actions/profile-action';
import { deleteAllTasks } from '../../redux/actions/task-action';
import { deleteUser } from '../../redux/actions/user-action';

import '../scss/Pages.style.scss';

const UserInfoPage = ({
  userState: { user, isAuth },
  profile,
  deleteAllTasks,
  deleteUser,
  history,
  getMyProfile,
}) => {
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <Fragment>
      <h1>
        <i className='fas fa-user-cog'></i> MY INFORMATION
      </h1>
      {!isAuth ? (
        <UtilPage purpose='guest' />
      ) : profile ? (
        <UserProfileParts
          user={user}
          profile={profile}
          deleteAllTasks={deleteAllTasks}
          deleteUser={deleteUser}
          history={history}
        />
      ) : (
        <UserNoProfileParts
          user={user}
          deleteAllTasks={deleteAllTasks}
          deleteUser={deleteUser}
          history={history}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
  profile: state.profileReducer.profile,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAllTasks: () => dispatch(deleteAllTasks()),
  deleteUser: () => dispatch(deleteUser()),
  getMyProfile: () => dispatch(getMyProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInfoPage));
