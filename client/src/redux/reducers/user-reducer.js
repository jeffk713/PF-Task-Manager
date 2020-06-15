import { USER } from '../actions/action-types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
  loading: true,
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
        loading: false,
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
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
