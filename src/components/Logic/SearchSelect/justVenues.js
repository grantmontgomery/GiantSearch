const justVenuesLogic = (
  term,
  location,
  startFormatted,
  endFormatted,
  radius,
  setMakeCall,
  resetState
) => {
  if (
    term === "" ||
    location === "" ||
    startFormatted === "" ||
    endFormatted === "" ||
    radius === ""
  ) {
    alert("Please enter in missing fields.");
  } else {
    setMakeCall();
    // resetState();
  }
};

export default justVenuesLogic;
