import { USER } from '../actions/action-types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
  userLoading: true,
  users: null,
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
        user: payload.me,
        isAuth: true,
        userLoading: false,
        users: payload.users,
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
        users: null,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
