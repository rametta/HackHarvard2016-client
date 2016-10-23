import {
  SET_AUTH
} from '../actions/types';

export default (state = [{username: 'john', password: 123}], action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.payload;
  }

  return state;
};
