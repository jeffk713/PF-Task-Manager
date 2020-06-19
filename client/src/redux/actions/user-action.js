import axios from 'axios';
import setupToken from '../../utilities/setup-token';

import { USER } from './action-types';
import { setAlert } from './alert-action';

export const getUser = () => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  try {
    const res = await axios.get('/user/all');
    dispatch({
      type: USER.GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER.GET_USER_FAILURE,
    });
  }
};

export const signIn = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/user/signin', body, config);
    dispatch({
      type: USER.SIGNIN_SUCCESS,
      payload: res.data,
    });
    dispatch(getUser());
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: USER.SIGNIN_FAILURE,
    });
  }
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: USER.LOGOUT_SUCCESS,
  });
};

export const signUp = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/user', body, config);
    dispatch({
      type: USER.SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(getUser());
    dispatch(setAlert('Registration Successful', 'green'));
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: USER.SIGNUP_FAILURE,
    });
  }
};

export const updateUser = ({ name, email }) => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email });
  try {
    await axios.patch('/user', body, config);
    dispatch({
      type: USER.UPDATE_USER_SUCCESS,
    });
    dispatch(getUser());
    dispatch(setAlert('Your account has been updated', 'green'));
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: USER.UPDATE_USER_FAILURE,
    });
  }
};

export const deleteUser = () => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  try {
    await axios.delete('/user');
    dispatch({
      type: USER.DELETE_USER_SUCCESS,
    });
    dispatch(setAlert('Your account has been deleted', 'green'));
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: USER.DELETE_USER_FAILURE,
    });
  }
};
