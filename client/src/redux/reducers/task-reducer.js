import { TASK } from '../actions/action-types';

const INITIAL_STATE = {
  tasks: [],
  taskLoading: true,
  error: {},
};

const taskReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload,
        taskLoading: false,
      };
    case TASK.CREATE_TASK_FAILURE:
    case TASK.GET_TASKS_FAILURE:
    case TASK.DELETE_TASK_FAILURE:
      return {
        ...state,
        taskLoading: false,
        error: payload,
      };
    case TASK.GET_TASKS_START:
      return {
        ...state,
        taskLoading: true,
      };
    default:
      return state;
  }
};

export default taskReducer;
