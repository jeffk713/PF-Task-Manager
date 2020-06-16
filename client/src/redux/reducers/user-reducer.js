import { USER } from '../actions/action-types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
  userLoading: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER.SIGNIN_SUCCESS:
    case USER.SIGNUP_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
      };
    case USER.GET_USER_SUCCESS:
      return {
        ...state,
        user: { ...payload },
        isAuth: true,
        userLoading: false,
      };
    case USER.SIGNIN_FAILURE:
    case USER.GET_USER_FAILURE:
    case USER.LOGOUT_SUCCESS:
    case USER.SIGNUP_FAILURE:
    case USER.DELETE_USER_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        user: null,
        userLoading: false,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
