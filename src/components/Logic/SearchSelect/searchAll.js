const searchAllLogic = (
  term,
  location,
  startFormatted,
  endFormatted,
  radius,
  makecall,
  resetState
) => {
  if (
    term === "" &&
    location === "" &&
    startFormatted === "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter in a term, dates, radius, and location.");
  } else if (
    term !== "" &&
    location === "" &&
    startFormatted === "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter location, dates, and radius");
  } else if (
    term !== "" &&
    location !== "" &&
    startFormatted === "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter dates and radius");
  } else if (
    term !== "" &&
    location !== "" &&
    startFormatted !== "" &&
    endFormatted === "" &&
    radius === ""
  ) {
    alert("Please enter end date and radius");
  } else if (
    term !== "" &&
    location !== "" &&
    startFormatted === "" &&
    endFormatted !== "" &&
    radius === ""
  ) {
    alert("Please enter start date and radius");
  } else if (
    term !== "" &&
    location !== "" &&
    startFormatted !== "" &&
    endFormatted !== "" &&
    radius === ""
  ) {
    alert("Please enter in a radius");
  } else {
    makecall();
    resetState();
  }
};

export default searchAllLogic;
