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
  //Yelp URL
  const yelp = new URL("https://api.yelp.com/v3/businesses/search"),
    params = {
      term: req.body.term,
      location: req.body.location,
      radius: 15000
    };

  Object.keys(params).forEach(key =>
    yelp.searchParams.append(key, params[key])
  );

  //Ticket Master URL
  const ticketMaster = new URL(
      "https://app.ticketmaster.com/discovery/v2/events"
    ),
    params = {
      apikey: `${process.env.REACT_APP_TICKETMASTER_API_KEY}`,
      postalCode: "90015",
      startDateTime: "2019-11-22T18:00:00Z",
      endDateTime: "2019-11-23T08:00:00Z"
    };

  Object.keys(params).forEach(key =>
    ticketMaster.searchParams.append(key, params[key])
  );

  // Yelp API Call

  const yelpCall = fetch(yelp, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
    }
  })

  //Ticketmaster Call

  const ticketMasterCall = fetch(ticketMaster)


  Promise.all([yelpCall, ticketMasterCall]).then(values => Promise.all(values.map(value => value.json())))
  .then(data => res.send(data))
  .catch(err => res.send(err.message))
}

app.listen(5000, () => {
  console.log("Server running on 5000");
})
