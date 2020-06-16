import axios from 'axios';

import setupToken from '../../utilities/setup-token';
import { TASK } from './action-types';

import { setAlert } from './alert-action';

export const getTasks = (sortBy = undefined) => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  let urlToGetTasks;
  try {
    if (sortBy === 'true' || 'false') urlToGetTasks = `/task?completed=${sortBy}`;
    if (sortBy === undefined || sortBy === 'all') urlToGetTasks = '/task';

    const res = await axios.get(urlToGetTasks);
    dispatch({
      type: TASK.GET_TASKS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: TASK.GET_TASKS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createTask = ({ date, title, detail, completed }) => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ date, title, detail, completed });

  try {
    await axios.post('/task', body, config);

    dispatch({ type: TASK.CREATE_TASK_SUCCESS });

    dispatch(getTasks());
    dispatch(setAlert('Task has been added', 'green'));
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: TASK.CREATE_TASK_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateTask = ({ date, title, detail, completed, _id }) => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ date, title, detail, completed });
  try {
    await axios.patch(`/task/${_id}`, body, config);

    dispatch({ type: TASK.CREATE_TASK_SUCCESS });

    dispatch(getTasks());
    dispatch(setAlert('Task has been updated', 'green'));
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: TASK.CREATE_TASK_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteTask = (_id) => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  try {
    await axios.delete(`/task/${_id}`);

    dispatch({ type: TASK.DELETE_TASK_SUCCESS });

    dispatch(getTasks());
    dispatch(setAlert('Task has been deleted', 'green'));
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: TASK.DELETE_TASK_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAllTasks = () => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  try {
    await axios.delete('/task');

    dispatch({ type: TASK.DELETE_TASK_SUCCESS });

    dispatch(getTasks());
    dispatch(setAlert('All tasks have been deleted', 'green'));
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: TASK.DELETE_TASK_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
