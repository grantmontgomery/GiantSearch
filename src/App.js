import React, { Component } from "react";
import { SearchBox } from "./components";
import { Results } from "./components";
import { AppContext } from "./AppContext";
import { Parts } from "./components";
import fetch from "node-fetch";
require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Venues: [],
      Events: [],
      Parts: [],
      venuesLoading: false,
      eventsLoading: false,
      makeCall: this.makeCall,
      addPart: this.addPart,
      removePart: this.removePart
    };
  }
  addPart = part => {
    this.setState({
      Parts: [...this.state.Parts, part]
    });
  };
  removePart = id => {
    this.setState({
      Parts: this.state.Parts.filter(part => part.id !== id)
    });
  };

  makeCall = (
    term,
    location,
    startFormatted,
    endFormatted,
    radius,
    endUnix,
    startUnix
  ) => {
    this.setState({ venuesLoading: true });
    this.setState({ eventsLoading: true });
    fetch("http://localhost:5000/yelpBusinessSearch", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ term, location, radius })
    })
      .then(res => res.json())
      .then(yelpBusinessData => {
        const { businesses } = yelpBusinessData;
        businesses.forEach(business => (business["type"] = "venue"));
        fetch("http://localhost:5000/yelpEventSearch", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ location, radius, startUnix, endUnix })
        })
          .then(res => res.json())
          .then(yelpEventsData => {
            const { events } = yelpEventsData;
            const noKids = events.filter(
              event => event.category !== "kids-family"
            );
            noKids.forEach(
              event => ((event.source = "yelp"), (event.type = "event"))
            );
            this.setState(() => ({
              Events: [...this.state.Events, ...noKids]
            }));
          });
        fetch("http://localhost:5000/ticketMasterSearch", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ location, startFormatted, endFormatted })
        })
          .then(res => res.json())
          .then(data => {
            const { _embedded } = data;
            const { events } = _embedded;
            events.forEach(
              event => ((event.source = "ticketmaster"), (event.type = "event"))
            );
            this.setState(() => ({
              venuesLoading: false,
              eventsLoading: false,
              Venues: [...businesses],
              Events: [...this.state.Events, ...events]
            }));
          })
          .catch(err => {
            this.setState({
              eventsLoading: false,
              venuesLoading: false,
              Venues: [...businesses]
            });
            this.setState({ venuesLoading: false, eventsLoading: false });
            console.log(err.message);
          });
      })
      .catch(err => {
        this.setState({ eventsLoading: false, venuesLoading: false });
        console.log(err.message);
      });
  };

  render() {
    console.log(this.state.eventsLoading);
    console.log(this.state.venuesLoading);
    return (
      <AppContext.Provider value={this.state}>
        <div>
          <Parts Parts={this.state.Parts}></Parts>
          <SearchBox></SearchBox>
          <Results
            Events={this.state.Events}
            Venues={this.state.Venues}
          ></Results>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
