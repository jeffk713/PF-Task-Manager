import React from 'react';
import { withRouter } from 'react-router-dom';

import '../scss/Task-User-list.style.scss';

const UserList = ({ history, name, email }) => {
  return (
    <div className='user-list'>
      <div className='to-detail' onClick={() => {}}>
        {name}
      </div>
      <div>{email}</div>
    </div>
  );
};

export default withRouter(UserList);
