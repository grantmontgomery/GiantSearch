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
  if (justEvents === true) {
    justEventsLogic(
      location,
      startFormatted,
      endFormatted,
      radius,
      setMakeCall,
      resetState
    );
  } else if (justVenues === true) {
    justVenuesLogic(
      term,
      location,
      startFormatted,
      endFormatted,
      radius,
      setMakeCall,
      resetState
    );
  } else if (searchAll === true) {
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
