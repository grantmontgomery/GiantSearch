const VenuesSearch = async ({
  term,
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
    return businesses;
  } catch {
    return;
  }
};

export default VenuesSearch;
