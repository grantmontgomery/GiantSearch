import React, { Component } from "react";
import { SearchBox, VenuesSearch } from "./components";
import { Results } from "./components";
import { AppContext } from "./AppContext";
import { EventsAPI } from "./components";
import { VenuesAPI } from "./components";
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

  makeCall = ({
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
    startUnix
  }) => {
    if (justEvents) {
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
        startUnix
      );
    } else if (justVenues) {
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
        startUnix
    }
    else if(searchAll){
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
    }
  };

  // makeCall = async ({
  //   term,
  //   searchAll,
  //   justEvents,
  //   justVenues,
  //   eventCategory,
  //   location,
  //   startFormatted,
  //   endFormatted,
  //   radius,
  //   endUnix,
  //   startUnix
  // }) => {
  //   if (searchAll) {
  //     try {
  //       this.setState({
  //         venuesLoading: true,
  //         eventsLoading: true,
  //         Events: [],
  //         Venues: []
  //       });
  //       let yelpBusinesses = await fetch(
  //         "http://localhost:5000/yelpBusinessSearch",
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json"
  //           },
  //           method: "POST",
  //           body: JSON.stringify({ term, location, radius })
  //         }
  //       );
  //       let yelpBusinessesData = await yelpBusinesses.json();
  //       const { businesses } = yelpBusinessesData;
  //       businesses.forEach(business => (business["type"] = "venue"));

  //       this.setState({ Venues: [...businesses], venuesLoading: false });
  //     } catch {
  //       this.setState({ businessErrors: true, venuesLoading: false });
  //     }
  //     try {
  //       let yelpEvents = await fetch("http://localhost:5000/yelpEventSearch", {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //         },
  //         method: "POST",
  //         body: JSON.stringify({ location, radius, startUnix, endUnix })
  //       });

  //       let yelpEventsData = (await yelpEvents.json()).events.filter(
  //         event => event.category !== "kids-family"
  //       );

  //       console.log(yelpEventsData);

  //       yelpEventsData.forEach(
  //         event => ((event.source = "yelp"), (event.type = "event"))
  //       );

  //       this.setState({ Events: [...yelpEventsData] });
  //     } catch {
  //       this.setState({ yelpEventsError: true });
  //     }
  //     try {
  //       let ticketMasterEvents = await fetch(
  //         "http://localhost:5000/ticketMasterSearch",
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json"
  //           },
  //           method: "POST",
  //           body: JSON.stringify({ location, startFormatted, endFormatted })
  //         }
  //       );

  //       let ticketMasterResponse = await ticketMasterEvents.json();

  //       const { _embedded } = ticketMasterResponse;
  //       const { events } = _embedded;
  //       events.forEach(
  //         event => ((event.source = "ticketmaster"), (event.type = "event"))
  //       );

  //       this.setState(() => ({
  //         Events: [...this.state.Events, ...events],
  //         eventsLoading: false
  //       }));
  //     } catch {
  //       this.setState({ ticketMasterError: true, eventsLoading: false });
  //     }
  //   } else if (justEvents) {
  //     try {
  //       let yelpEvents = await fetch("http://localhost:5000/yelpEventSearch", {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //         },
  //         method: "POST",
  //         body: JSON.stringify({ location, radius, startUnix, endUnix })
  //       });

  //       let yelpEventsData = (await yelpEvents.json()).events.filter(
  //         event => event.category !== "kids-family"
  //       );

  //       yelpEventsData.forEach(
  //         event => ((event.source = "yelp"), (event.type = "event"))
  //       );

  //       this.setState({ Events: [...yelpEventsData] });
  //     } catch {
  //       this.setState({ yelpEventsError: true });
  //     }
  //     try {
  //       let ticketMasterEvents = await fetch(
  //         "http://localhost:5000/ticketMasterSearch",
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json"
  //           },
  //           method: "POST",
  //           body: JSON.stringify({ location, startFormatted, endFormatted })
  //         }
  //       );

  //       let ticketMasterResponse = await ticketMasterEvents.json();

  //       const { _embedded } = ticketMasterResponse;
  //       const { events } = _embedded;
  //       events.forEach(
  //         event => ((event.source = "ticketmaster"), (event.type = "event"))
  //       );

  //       this.setState(() => ({
  //         Events: [...this.state.Events, ...events],
  //         eventsLoading: false
  //       }));
  //     } catch {
  //       this.setState({ ticketMasterError: true, eventsLoading: false });
  //     }
  //   } else if (justVenues) {
  //     try {
  //       this.setState({
  //         venuesLoading: true,
  //         Events: [],
  //         Venues: []
  //       });
  //       let yelpBusinesses = await fetch(
  //         "http://localhost:5000/yelpBusinessSearch",
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json"
  //           },
  //           method: "POST",
  //           body: JSON.stringify({ term, location, radius })
  //         }
  //       );
  //       let yelpBusinessesData = await yelpBusinesses.json();
  //       const { businesses } = yelpBusinessesData;
  //       businesses.forEach(business => (business["type"] = "venue"));

  //       this.setState({ Venues: [...businesses], venuesLoading: false });
  //     } catch {
  //       this.setState({ businessErrors: true, venuesLoading: false });
  //     }
  //   }
  // };

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
