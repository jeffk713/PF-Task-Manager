import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import { v4 as uuid } from 'uuid';

import ChatList from '../Chat-parts.js/Chat-list';

import '../scss/Pages.style.scss';

let socket;

const INITIAL_MESSAGE = {
  message: '',
};
const INITIAL_CHAT = {
  chat: [],
};
const INITIAL_NUMBER_OF_USER = {
  userNumber: 0,
};
const ChatPage = ({ isAuth }) => {
  const [chatData, setChatData] = useState(INITIAL_CHAT);
  const [messageData, setMessage] = useState(INITIAL_MESSAGE);
  const [userNumberData, setUserNumberData] = useState(INITIAL_NUMBER_OF_USER);
  const { message } = messageData;
  const { chat } = chatData;
  const { userNumber } = userNumberData;

  useEffect(() => {
    socket = io.connect(process.env.PORT || 'localhost:5000');
    const { username, room } = queryString.parse(window.location.search);
    socket.emit('user-join', { username, room });
    return () => {
      socket.emit('user-leave');
    };
  }, []);

  useEffect(() => {
    socket.on('message', (messageToAdd) => {
      saveMessageLocal(messageToAdd);
    });
  }, [chatData]);

  useEffect(() => {
    socket.on('roomData', (roomData) => {
      setUserNumberData({ userNumber: roomData.users.length });
    });
  }, [userNumberData]);

  const saveMessageLocal = (messageToAdd) => {
    setChatData({ chat: [...chat, { id: uuid(), ...messageToAdd }] });
  };

  const typeMessage = (event) => {
    const { name, value } = event.target;
    setMessage({ [name]: value });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('send-message', message);
    setMessage(INITIAL_MESSAGE);
  };

  if (!isAuth) return <Redirect to='/' />;
  return (
    <Fragment>
      <h1>
        <i className='fas fa-comments'></i> LIVE CHAT
      </h1>
      <div className='chat-container'>
        <div className='user-number'>
          <p> Number of users: {userNumber}</p>
        </div>
        <div className='message-screen'>
          {chat.map(({ id, ...others }) => (
            <ChatList key={id} {...others} />
          ))}
        </div>
        <form className='message-console'>
          <div className='message-input'>
            <textarea
              name='message'
              type='text'
              value={message}
              onChange={typeMessage}
              placeholder='Say something'
              rows='2'
              onKeyDown={(event) => {
                if (event.keyCode == 13) sendMessage(event);
              }}
            />
          </div>
          <div className='btn btn-main bg-main message-btn' onClick={sendMessage}>
            SEND
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
});

export default connect(mapStateToProps)(ChatPage);
