import { ALERT } from '../actions/action-types';

const INITIAL_STATE = [];

const alertReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALERT.SET_ALERT:
      return [...state, payload];
    case ALERT.UNSET_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return [...state];
  }
};

export default alertReducer;
