const EventCategorySearch = (
  input,
  setYelpCategory,
  setTicketMasterCategory
) => {
  if (input === "All" || input === "") {
    setTicketMasterCategory("");
    setYelpCategory("");
  } else if (input === "Music") {
    setTicketMasterCategory(["KZFzniwnSyZfZ7v7nJ"]);
    setYelpCategory(["music"]);
  } else if (input === "Film") {
    setTicketMasterCategory(["KZFzniwnSyZfZ7v7nn"]);
    setYelpCategory(["film"]);
  } else if (input === "Arts & Theatre") {
    setTicketMasterCategory(["KZFzniwnSyZfZ7v7na"]);
    setYelpCategory(["visual-arts", "performing-arts"]);
  } else if (input === "Sports & Active Lifestyle") {
    setTicketMasterCategory(["KZFzniwnSyZfZ7v7nE"]);
    setYelpCategory(["sports-active-life"]);
  } else if (input === "Food & Drink") {
    setYelpCategory(["food-and-drink"]);
  } else if (input === "NightLife") {
    setYelpCategory(["nightlife"]);
  } else if (input === "Festivals & Fairs") {
    setYelpCategory(["festivals-fairs"]);
  } else if (input === "Other") {
    setTicketMasterCategory(["KZFzniwnSyZfZ7v7n1"]);
    setYelpCategory(["official-yelp-events", "fashion"]);
  }
};

export default EventCategorySearch;
