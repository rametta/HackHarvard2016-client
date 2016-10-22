import { combineReducers } from 'redux';
import auth from './auth';
import historicaldata from './hist_stock_data';

const rootReducer = combineReducers({
  // Current user
  user: auth,
  histData: historicaldata
});

export default rootReducer;
