import fetch from "node-fetch";

const EventsAPI = async (
  loading,
  notLoading,
  setEvents,
  error,

  eventCategory,
  location,
  startFormatted,
  endFormatted,
  radius,
  endUnix,
  startUnix,
  yelpCategories,
  ticketmasterCategories
) => {
  try {
    loading("events");
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

    yelpEventsData.forEach(
      event => ((event.source = "yelp"), (event.type = "event"))
    );
    setEvents(yelpEventsData);
  } catch {
    error("yelpevents");
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
    notLoading("events");
    setEvents(events);
  } catch {
    notLoading("events");
    error("ticketmaster");
  }
};

export default EventsAPI;
