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

app.post("/yelpSearch", (req, res) => {
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
    arguments = {
      apikey: `${process.env.REACT_APP_TICKETMASTER_API_KEY}`,
      postalCode: "90015",
      startDateTime: "2019-11-22T18:00:00Z",
      endDateTime: "2019-11-23T08:00:00Z"
    };

  Object.keys(arguments).forEach(key =>
    ticketMaster.searchParams.append(key, arguments[key])
  );

  // Yelp API Call

  const yelpCall = fetch(yelp, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
    }
  });

  yelpCall
    .then(res => console.log(res))
    // .then(yelps => yelps.json())
    // .then(yelpdata => res.send(yelpdata))
    .catch(err => err.message);

  //Ticketmaster Call

  // const ticketMasterCall = fetch(ticketMaster);

  // ticketMasterCall
  //   .then(res => console.log(res))
  //   // .then(events => events.json())
  //   // .then(eventdata => res.send(eventdata))
  //   .catch(err => res.send(err.message));
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
