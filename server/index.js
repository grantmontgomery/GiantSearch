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

app.post("/yelpBusinessSearch", (req, res) => {
  const yelpBusinesses = new URL("https://api.yelp.com/v3/businesses/search"),
    params = {
      term: req.body.term,
      location: req.body.location,
      radius: req.body.radius
    };
  Object.keys(params).forEach(key =>
    yelpBusinesses.searchParams.append(key, params[key])
  );
  fetch(yelpBusinesses, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
    }
  })
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

app.post("/yelpEventSearch", (req, res) => {
  const categories = req.body.yelpCategories;
  const yelpEvents = new URL("https://api.yelp.com/v3/events"),
    params = {
      location: req.body.location,
      start_date: req.body.startUnix,
      end_date: req.body.endUnix,
      radius: req.body.radius,
      categories
    };
  Object.keys(params).forEach(key =>
    yelpEvents.searchParams.append(key, params[key])
  );
  fetch(yelpEvents, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
    }
  })
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

app.post("/ticketMasterSearch", (req, res) => {
  const segmentId = req.body.ticketmasterCategories;
  const ticketMaster = new URL(
      "https://app.ticketmaster.com/discovery/v2/events"
    ),
    arguments = {
      apikey: `${process.env.REACT_APP_TICKETMASTER_API_KEY}`,
      startDateTime: req.body.startFormatted,
      endDateTime: req.body.endFormatted,
      radius: 2000,
      segmentId
    };

  Object.keys(arguments).forEach(key =>
    ticketMaster.searchParams.append(key, arguments[key])
  );

  isNaN(parseInt(req.body.location)) === true
    ? ticketMaster.searchParams.append("city", req.body.location)
    : ticketMaster.searchParams.append("postalCode", req.body.location);

  fetch(ticketMaster)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
