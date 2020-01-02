import justEvents from "./justEvents";
import justVenues from "./justVenues";
import searchAll from "./searchAll";

const SearchSelect = (
  event,
  makecall,
  resetState,
  {
    location,
    startFormatted,
    term,
    endFormatted,
    radius,
    searchAll,
    justEvents,
    justVenues
  }
) => {
  event.preventDefault();
  if (justEvents) {
  }
  resetState();
};

export default SearchSelect;
