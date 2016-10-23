import {
    SET_AUTH
} from './types';


let base = 'http://localhost:3000';
let yahoo_base = 'https://query.yahooapis.com/v1/public/yql?q=';

export const login = (data) => {
  return function(dispatch) {
      // Send API Request
      var formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      var obj = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "username="+data.username+"&password="+data.password
      };


      fetch(base + '/auth/login', obj)
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            console.log('success: ', json);
            dispatch({
                type: SET_AUTH,
                payload: json
            });
          })
          .catch(function(err) {
            console.log('err: ', err);
          });
  };
};

export const logout = () => {
    return {
        type: SET_AUTH,
        payload: ''
    }
};
