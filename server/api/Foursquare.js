require("dotenv").config();
const fetch = require("node-fetch");

const response = fetch(
  `https://api.foursquare.com/v2/venues/explore?client_id=${process.env.REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET}&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee`
);

console.log(process.env.REACT_APP_FOURSQUARE_CLIENT_ID);
response.then(resp => console.log(resp)).catch(err => console.log(err.message));
