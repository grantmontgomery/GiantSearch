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

  makeCall = async (
    term,
    location,
    startFormatted,
    endFormatted,
    radius,
    endUnix,
    startUnix
  ) => {
    try {
      this.setState({
        venuesLoading: true,
        eventsLoading: true,
        Events: [],
        Venues: []
      });
      let yelpBusinesses = await fetch(
        "http://localhost:5000/yelpBusinessSearch",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ term, location, radius })
        }
      );
      let yelpBusinessesData = await yelpBusinesses.json();
      const { businesses } = yelpBusinessesData;
      businesses.forEach(business => (business["type"] = "venue"));

      this.setState({ Venues: [...businesses], venuesLoading: false });
    } catch {
      this.setState({ businessErrors: true, venuesLoading: false });
    }
    try {
      let yelpEvents = await fetch("http://localhost:5000/yelpEventSearch", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ location, radius, startUnix, endUnix })
      });

      let yelpEventsData = (await yelpEvents.json()).events.filter(
        event => event.category !== "kids-family"
      );

      console.log(yelpEventsData);

      yelpEventsData.forEach(
        event => ((event.source = "yelp"), (event.type = "event"))
      );

      this.setState({ Events: [...yelpEventsData] });
    } catch {
      this.setState({ yelpEventsError: true });
    }
    try {
      let ticketMasterEvents = await fetch(
        "http://localhost:5000/ticketMasterSearch",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ location, startFormatted, endFormatted })
        }
      );

      let ticketMasterResponse = await ticketMasterEvents.json();

      const { _embedded } = ticketMasterResponse;
      const { events } = _embedded;
      events.forEach(
        event => ((event.source = "ticketmaster"), (event.type = "event"))
      );

      this.setState(() => ({
        Events: [...this.state.Events, ...events],
        eventsLoading: false
      }));
    } catch {
      this.setState({ ticketMasterError: true, eventsLoading: false });
    }
  };

  render() {
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
