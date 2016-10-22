import {
    SET_AUTH,
    HIST_STOCK_DATA
} from './types';


let base = 'http://localhost:3000';
let yahoo_base = 'https://query.yahooapis.com/v1/public/yql?q=';


export const login = () => {
  // Send API Request
  fetch(base + '/auth/login', { method: 'POST', body: {username: 'hassan', password: '123' }} )
  .then(response => response.json())
  .then(json => console.log('json: ', json))
  .catch(err => console.log('err: ', err));

  return {
    type: SET_AUTH,
    payload: { username : 'hassan' }
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
