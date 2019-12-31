const searchAll = async ({
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
