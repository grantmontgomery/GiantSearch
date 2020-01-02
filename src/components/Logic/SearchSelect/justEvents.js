const justEventsLogic = (
  location,
  startFormatted,
  endFormatted,
  radius,
  makeCall,
  resetState
) => {
  if (
    location === "" &&
    startFormatted === "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter in a location, dates, and radius.");
  } else if (
    location !== "" &&
    startFormatted === "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter dates, and radius");
  } else if (
    location !== "" &&
    startFormatted === "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter dates and radius");
  } else if (
    location !== "" &&
    startFormatted !== "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter end date and radius");
  } else if (
    location !== "" &&
    startFormatted === "" &&
    endFormatted !== "" &&
    radius === ""
  ) {
    alert("Please enter start date and radius");
  } else if (
    location !== "" &&
    startFormatted !== "" &&
    endFormatted !== "" &&
    radius === ""
  ) {
    alert("Please enter in a radius");
  } else {
    makeCall();
    resetState();
  }
};

export default justEventsLogic;