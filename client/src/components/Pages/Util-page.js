import React from 'react';
import { withRouter } from 'react-router-dom';

const UtilPage = ({ history, purpose }) => {
  let setup;
  if (purpose === 'guest') {
    setup = {
      title: "LOOKS LIKE YOU HAVEN'T SIGNED IN",
      subtitle: 'Ready to sign in or sign up?',
      icon: 'fas fa-user-lock',
      pushPage: '/sign',
    };
  }
  if (purpose === 'emptyData') {
    setup = {
      title: 'LOOKS LIKE THERE IS NO TASK',
      subtitle: 'Ready to add some tasks?',
      icon: 'fas fa-folder-open',
      pushPage: '/task-add',
    };
  }
  if (purpose === 'noAuthStart') {
    setup = {
      title: 'HELLO! PLEASE START WITH SIGN IN!',
      subtitle: 'Ready to sign in or sign up?',
      icon: 'fas fa-bell',
      pushPage: '/sign',
    };
  }
  if (purpose === 'authStart') {
    setup = {
      title: 'DO YOU HAVE SOMETHING TO DO?',
      subtitle: 'Ready to add a task?',
      icon: 'fas fa-play',
      pushPage: '/task-add',
    };
  }
  return (
    <div className='util'>
      <div className='util-header'>
        <div className='util-header-icon'>
          <i className={setup.icon}></i>
        </div>
        <div className='util-header-title'>
          <h2>{setup.title}</h2>
          <div className='subtitle'>
            <p>{setup.subtitle}</p>
            <div className='btn bg-main btn-sm' onClick={() => history.push(setup.pushPage)}>
              Click here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UtilPage);
