import React, { Component } from "react";
import { SearchBox } from "./components";
import { Results } from "./components";
import { AppContext } from "./AppContext";
import { Parts } from "./components";
require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Venues: [],
      Events: [],
      Parts: [],
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
            this.setState({
              Venues: [...businesses],
              Events: [...data._embedded.events]
            });
          })
          .catch(err => {
            this.setState({
              Venues: [...businesses]
            });
            console.log(err.message);
          });
      })
      .catch(err => console.log(err.message));
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div>
          <Parts></Parts>
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
