import justEventsLogic from "./justEvents";
import justVenuesLogic from "./justVenues";
import searchAllLogic from "./searchAll";

const SearchSelect = (
  event,
  makeCall,
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
    justEventsLogic(
      location,
      startFormatted,
      endFormatted,
      radius,
      makeCall,
      resetState
    );
  } else if (justVenues) {
    justVenuesLogic(
      term,
      location,
      startFormatted,
      endFormatted,
      radius,
      makeCall,
      resetState
    );
  } else if (searchAll) {
    searchAllLogic(
      term,
      location,
      startFormatted,
      endFormatted,
      radius,
      makeCall,
      resetState
    );
  }
};

export default SearchSelect;
