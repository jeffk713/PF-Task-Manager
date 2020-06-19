import { PROFILE } from '../actions/action-types';

const INITIAL_STATE = {
  profile: null,
  avatar: null,
  error: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      };
    case PROFILE.GET_PROFILE_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
