import React from 'react';
import { withRouter } from 'react-router-dom';

import '../scss/Task-User-list.style.scss';

const UserList = ({ history, match, id, name, email }) => {
  return (
    <div className='user-list'>
      <div className='to-detail' onClick={() => history.push(`${match.path}/${id}`)}>
        {name}
      </div>
      <div>{email}</div>
    </div>
  );
};

export default withRouter(UserList);
