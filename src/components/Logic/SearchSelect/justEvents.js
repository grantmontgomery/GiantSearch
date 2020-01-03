const justEventsLogic = (
  location,
  startFormatted,
  endFormatted,
  radius,
  setMakeCall,
  resetState
) => {
  if (
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

export default justEventsLogic;
