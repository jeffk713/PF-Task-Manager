import { TASK } from '../actions/action-types';

const INITIAL_STATE = {
  tasks: [],
  loading: true,
  error: {},
};

const taskReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case TASK.CREATE_TASK_FAILURE:
    case TASK.GET_TASKS_FAILURE:
    case TASK.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
