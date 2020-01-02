import React, { Component } from "react";
import { SearchBox, VenuesSearch } from "./components";
import { Results } from "./components";
import { AppContext } from "./AppContext";
import { EventsAPI } from "./components";
import { VenuesAPI } from "./components";
import { Parts } from "./components";
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
      callAPIs: this.callAPIs,
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

  loading = input => {
    if (input === "events") {
      this.setState({ eventsLoading: true });
    } else if (input === "venues") {
      this.setState({ venuesLoading: true });
    } else if (input === "") {
      this.setState({ eventsLoading: true, venuesLoading: true });
    }
  };

  notLoading = input => {
    if (input === "events") {
      this.setState({ eventsLoading: false });
    } else if (input === "venues") {
      this.setState({ venuesLoading: false });
    } else if (input === "") {
      this.setState({ eventsLoading: false, venuesLoading: false });
    }
  };

  setBusinesses = businesses => {
    this.setState({ Venues: [...businesses] });
  };

  setEvents = events => {
    events.forEach(event => {
      if (event.source === "yelp") {
        console.log(event);
      }
    });
    this.setState(() => ({ Events: [...this.state.Events, ...events] }));
  };

  error = input => {
    if (input === "ticketmaster") {
      this.setState({ ticketMasterError: true });
    } else if (input === "yelpevents") {
      this.setState({ yelpEventsError: true });
    } else if (input === "businesses") {
      this.setState({ businessErrors: true });
    }
  };

  callAPIs = ({
    term,
    searchAll,
    justEvents,
    justVenues,
    eventCategory,
    location,
    startFormatted,
    endFormatted,
    radius,
    endUnix,
    startUnix,
    yelpCategories,
    ticketmasterCategories
  }) => {
    if (justEvents) {
      this.setState({ Events: [], Venues: [] });
      EventsAPI(
        this.loading,
        this.notLoading,
        this.setEvents,
        this.error,
        eventCategory,
        location,
        startFormatted,
        endFormatted,
        radius,
        endUnix,
        startUnix,
        yelpCategories,
        ticketmasterCategories
      );
    } else if (justVenues) {
      this.setState({ Events: [], Venues: [] });
      VenuesAPI(
        this.loading,
        this.notLoading,
        this.setBusinesses,
        this.error,
        term,
        location,
        startFormatted,
        endFormatted,
        radius,
        endUnix,
        startUnix
      );
    } else if (searchAll) {
      this.setState({ Events: [], Venues: [] });
      VenuesAPI(
        this.loading,
        this.notLoading,
        this.setBusinesses,
        this.error,
        term,
        location,
        startFormatted,
        endFormatted,
        radius,
        endUnix,
        startUnix
      );
      EventsAPI(
        this.loading,
        this.notLoading,
        this.setEvents,
        this.error,
        eventCategory,
        location,
        startFormatted,
        endFormatted,
        radius,
        endUnix,
        startUnix,
        yelpCategories,
        ticketmasterCategories
      );
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
