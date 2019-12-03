import React, { Component } from "react";
import { SearchBox } from "./components";
import { Results } from "./components";
import { AppContext } from "./AppContext";
require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Results: [],
      venuesDivided: [],
      Venues: [],
      eventsDivided: [],
      Events: [],
      dateParts: [],
      makeCall: this.makeCall,
      addPart: this.addPart,
      removePart: this.removePart
    };
  }
  addPart = part => {
    this.setState({
      dateParts: [...this.state.dateParts, part]
    });
  };
  removePart = name => {
    this.setState({
      dateParts: this.state.dateParts.filter(part => part.name !== name)
    });
  };
  makeCall = (term, location, startFormatted, endFormatted) => {
    fetch("http://localhost:5000/yelpSearch", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ term, location })
    })
      .then(res => res.json())
      .then(yelpData => {
        const { businesses } = yelpData;
        businesses.forEach(business => (business["type"] = "venue"));
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
            const venuesDivided = [];
            const eventsDivided = [];
            for (let i = 0; i < businesses.length; i += 4) {
              i + 4 < businesses.length
                ? venuesDivided.push(businesses.slice(i, i + 4))
                : venuesDivided.push(businesses.slice(i));
            }
            for (let i = 0; i < data._embedded.events.length; i += 4) {
              i + 4 < data._embedded.events.length
                ? eventsDivided.push(data._embedded.events.slice(i, i + 4))
                : eventsDivided.push(data._embedded.events.slice(i));
            }
            this.setState({
              venuesDivided: [...venuesDivided],
              eventsDivided: [...eventsDivided],
              Venues: [...businesses],
              Events: [...data._embedded.events],
              Results: [...businesses, ...data._embedded.events]
            });
          })
          .catch(err => {
            const venuesDivided = [];
            for (let i = 0; i < businesses.length; i += 4) {
              i + 4 < businesses.length
                ? venuesDivided.push(businesses.slice(i, i + 4))
                : venuesDivided.push(businesses.slice(i));
            }
            this.setState({
              Results: [...businesses],
              Venues: [...businesses],
              venuesDivided: [...venuesDivided]
            });
            console.log(err.message);
          });
      })
      .catch(err => console.log(err.message));
  };

  render() {
    console.log(this.state.dateParts);
    return (
      <AppContext.Provider value={this.state}>
        <div>
          <SearchBox></SearchBox>
          <Results
            eventsDivided={this.state.eventsDivided}
            venuesDivided={this.state.venuesDivided}
            Results={this.state.Results}
            Events={this.state.Events}
            Venues={this.state.Venues}
          ></Results>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
