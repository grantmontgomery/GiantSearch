const express = require("express");
const cors = require("cors");
require("dotenv").config();
const json = require("body-parser").json;
const urlEncoded = require("body-parser").urlencoded;
const fetch = require("node-fetch");

const app = express();

app.use(json());
app.use(urlEncoded({ extended: true }));
app.use(cors());

app.post("/", (req, res) => {
  const yelp = new URL("https://api.yelp.com/v3/businesses/search"),
    params = {
      term: req.body.term,
      location: req.body.location,
      radius: 15000
    };

  Object.keys(params).forEach(key =>
    yelp.searchParams.append(key, params[key])
  );
  fetch(yelp, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
    }
  })
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
