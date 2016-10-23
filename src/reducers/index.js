import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  // Current user
  user: auth
});

export default rootReducer;
