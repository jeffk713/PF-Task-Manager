import React from 'react';
import moment from 'moment';

import '../scss/Task-User-list.style.scss';

const ChatList = ({ username, message, createdAt }) => {
  return (
    <div className='message-box'>
      <div className='message'>
        <strong>{username}: </strong>
        <p>{message}</p>
      </div>
      <div className='message-time'>
        <small>{moment(createdAt).format('ddd, h:mm a')}</small>
      </div>
    </div>
  );
};

export default ChatList;
