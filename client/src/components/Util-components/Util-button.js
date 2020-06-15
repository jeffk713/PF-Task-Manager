import React from 'react';
import { withRouter } from 'react-router-dom';

const UtilButton = ({ history, pushUrl = undefined, purpose, handleClick = undefined }) => {
  let setup;
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
