import { v4 as uuid } from 'uuid';

import { ALERT } from './action-types';

export const setAlert = (message, color) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: ALERT.SET_ALERT,
    payload: { id, message, color },
  });

  setTimeout(() => {
    dispatch({
      type: ALERT.UNSET_ALERT,
      payload: id,
    });
  }, 2000);
};
