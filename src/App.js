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
      setResults: this.setResults,
      makeCall: this.makeCall,
      Venues: [],
      addVenue: this.addVenue,
      removeVenue: this.removeVenue
    };
  }
  addVenue = venue => {
    this.setState({
      Venues: [...this.state.Venues, venue]
    });
  };
  removeVenue = name => {
    this.setState({
      Venues: this.state.Venues.filter(venue => venue.name !== name)
    });
  };
  makeCall = (term, location) => {
    fetch("http://localhost:5000/yelpSearch", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ term, location })
    })
      .then(res => res.json())
      .then(data => this.setState({ Results: data.businesses }))
      .catch(err => console.log(err.message));

    fetch("http://localhost:5000/ticketMasterSearch", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ term, location })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err.message));
  };

  render() {
    console.log(this.state);
    return (
      <AppContext.Provider value={this.state}>
        <div>
          <SearchBox></SearchBox>
          <Results Results={this.state.Results}></Results>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
