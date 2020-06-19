import { combineReducers } from 'redux';

import alertReducer from './alert-reducer';
import userReducer from './user-reducer';
import taskReducer from './task-reducer';
import profileReducer from './profile-reducer';

const rootReducer = combineReducers({
  alertReducer,
  userReducer,
  taskReducer,
  profileReducer,
});

export default rootReducer;
