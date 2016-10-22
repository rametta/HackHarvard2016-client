import {
  SET_AUTH
} from '../actions/types';

export default (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case SET_AUTH:
      return action.payload;
  }

  return state;
};
