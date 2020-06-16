import React from 'react';
import { withRouter } from 'react-router-dom';

const INITIAL_SETUP = {
  class: '',
  icon: '',
};

const UtilButton = ({ history, purpose, pushUrl = undefined, handleClick = undefined }) => {
  let setup = INITIAL_SETUP;
  let onClick;
  if (purpose === 'add') {
    setup = {
      class: 'bg-main',
      icon: 'fas fa-calendar-plus',
    };
  }
  if (purpose === 'back') {
    setup = {
      class: 'bg-light',
      icon: 'fas fa-arrow-left',
    };
  }
  if (purpose === 'edit') {
    setup = {
      class: 'bg-light',
      icon: 'fas fa-pencil-alt',
    };
  }
  if (purpose === 'delete') {
    setup = {
      class: 'bg-warning',
      icon: 'fas fa-trash-alt',
    };
  }
  if (pushUrl) onClick = () => history.push(pushUrl);

  return (
    <div className='util-btn'>
      <div
        className={`btn ${setup.class}`}
        onClick={handleClick === undefined ? onClick : handleClick}
      >
        <i className={setup.icon}></i>
      </div>
    </div>
  );
};

export default withRouter(UtilButton);
