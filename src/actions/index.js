import {
    SET_AUTH,
    HIST_STOCK_DATA
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

export const getStockHistorical = (symbol, start, end, format='json') => {
   return function(dispatch) {
     const query = `${yahoo_base}select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20'${symbol}'%20and%20startDate%3D'${start}'%20and%20endDate%3D'${end}'%3B&format=${format}&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

     fetch(query)
       .then(response => response.json())
       .then(json => {
         const result = json.query.results;
         dispatch({
           type: HIST_STOCK_DATA,
           payload: result
         })
       });
   }
}
