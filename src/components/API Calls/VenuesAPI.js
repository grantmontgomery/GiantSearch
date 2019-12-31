import fetch from "node-fetch";

const VenuesAPI = async (
  loading,
  notLoading,
  setBusinesses,
  error,
  term,
  location,
  startFormatted,
  endFormatted,
  radius,
  endUnix,
  startUnix
) => {
  try {
    loading("venues");
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
    notLoading("venues");
    setBusinesses(businesses);
  } catch {
    error("businesses");
  }
};

export default VenuesAPI;
