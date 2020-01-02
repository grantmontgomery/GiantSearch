import justEventsLogic from "./justEvents";
import justVenuesLogic from "./justVenues";
import searchAllLogic from "./searchAll";

const SearchSelect = (
  setMakeCall,
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
  if (justEvents) {
    justEventsLogic(
      location,
      startFormatted,
      endFormatted,
      radius,
      setMakeCall,
      resetState
    );
  } else if (justVenues) {
    justVenuesLogic(
      term,
      location,
      startFormatted,
      endFormatted,
      radius,
      setMakeCall,
      resetState
    );
  } else if (searchAll) {
    searchAllLogic(
      term,
      location,
      startFormatted,
      endFormatted,
      radius,
      setMakeCall,
      resetState
    );
  }
};

export default SearchSelect;
