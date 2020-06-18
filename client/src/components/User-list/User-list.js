import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../scss/Task-User-list.style.scss';

const UserList = ({ history, match, id, name }) => {
  return (
    <div className='user-list'>
      <div className='to-detail' onClick={() => history.push(`${match.path}/${id}`)}>
        {name}
      </div>
      <div>I am a soon-to-be developer</div>
    </div>
  );
};

export default connect()(withRouter(UserList));
