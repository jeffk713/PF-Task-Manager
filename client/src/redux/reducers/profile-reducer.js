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
    case PROFILE.UPLOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      };
    case PROFILE.GET_PROFILE_FAILURE:
    case PROFILE.UPLOAD_PROFILE_FAILURE:
      return {
        ...state,
        profile: null,
        error: payload,
      };
    case PROFILE.UPLOAD_PICTURE_SUCCESS:
      return {
        ...state,
        avatar: payload,
      };
    case PROFILE.UPLOAD_PICTURE_FAILURE:
      return {
        ...state,
        avatar: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
