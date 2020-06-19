import axios from 'axios';

import { setAlert } from '../actions/alert-action';
import setupToken from '../../utilities/setup-token';

import { PROFILE } from '../actions/action-types';

export const getMyProfile = () => async (dispatch) => {
  if (localStorage.token) setupToken(localStorage.token);
  try {
    const res = await axios.get('/profile/me');

    dispatch({
      type: PROFILE.GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) error.forEach((err) => dispatch(setAlert(err.msg, 'red')));

    dispatch({
      type: PROFILE.GET_PROFILE_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
