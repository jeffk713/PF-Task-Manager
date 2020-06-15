import { combineReducers } from 'redux';

import alertReducer from './alert-reducer';
import userReducer from './user-reducer';
import taskReducer from './task-reducer';

const rootReducer = combineReducers({
  alertReducer,
  userReducer,
  taskReducer,
});

export default rootReducer;
