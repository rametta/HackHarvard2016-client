import {
  SET_AUTH
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_AUTH:
      return [...state, ...action.payload];
  }

  return state;
};
