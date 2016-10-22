import {
    SET_AUTH
} from './types';

var base = 'http://localhost:3000';

export const login = () => {
  // Send API Request
  fetch(base + '/auth/login', { method: 'POST', body: {username: 'hassan', password: '123' }} )
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
   console.log('json: ', json);
  })
  .catch(function(err) {
    console.log('err: ', err);
  });

  return {
    type: SET_AUTH,
    payload: { username : 'hassan' }
  }
};
