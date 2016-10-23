import {
  HIST_STOCK_DATA
} from '../actions/types';

export default (state = [], action) => {
  console.log('reducer: ',action.payload);
  switch (action.type) {
    case HIST_STOCK_DATA:
      return [...state, ...action.payload.quote];
  }

  return state;
};