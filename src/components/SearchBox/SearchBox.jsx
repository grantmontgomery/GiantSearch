import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import DatePicker from "react-datepicker";
import { VenuesSearch } from "../VenuesSearch";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchBox.css";

require("dotenv").config();

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      renderVenuesSearch: true
    };
  }

  updateTextInput = event => {
    this.setState({ term: event.target.value });
  };

  handleRadiusChange = event => {
    const { target } = event;
    const valuetoInt = parseInt(target.value);
    this.setState({ [target.name]: valuetoInt });
  };

  VenuesSearch = event => {
    const { target } = event;
    if (target.checked === false) {
      target.checked = true;
      this.setState({ renderVenuesSearch: false });
    } else {
      target.checked = false;
      this.setState({ renderVenuesSearch: true });
    }
  };

  handleStartDateChange = date => {
    const unixStartDate = Math.round(new Date(date).getTime() / 1000);
    const startSelectedDate = new Date(date);
    this.setState({ startDate: startSelectedDate });
    let months =
      startSelectedDate.getMonth() === 0
        ? `0${1}`
        : startSelectedDate.getMonth() + 1 < 10
        ? "0" + (startSelectedDate.getMonth() + 1)
        : startSelectedDate.getMonth() + 1;
    let days =
      startSelectedDate.getDate() === 0
        ? startSelectedDate.getDate() + "0"
        : startSelectedDate.getDate() < 10
        ? "0" + startSelectedDate.getDate()
        : startSelectedDate.getDate();
    let hours =
      startSelectedDate.getHours() === 0
        ? startSelectedDate.getHours() + "0"
        : startSelectedDate.getHours() < 10
        ? "0" + startSelectedDate.getHours()
        : startSelectedDate.getHours();
    let minutes =
      startSelectedDate.getMinutes() === 0
        ? startSelectedDate.getMinutes() + "0"
        : startSelectedDate.getMinutes() < 10
        ? "0" + startSelectedDate.getMinutes()
        : startSelectedDate.getMinutes();
    let seconds =
      startSelectedDate.getSeconds() === 0
        ? startSelectedDate.getSeconds() + "0"
        : startSelectedDate.getSeconds() < 10
        ? "0" + startSelectedDate.getSeconds()
        : startSelectedDate.getSeconds();
    this.setState({
      startFormatted: `${startSelectedDate.getFullYear()}-${months}-${days}T${hours}:${minutes}:${seconds}Z`,
      startUnix: unixStartDate
    });
  };

  handleEndDateChange = date => {
    const unixEndDate = Math.round(new Date(date).getTime() / 1000);
    const endSelectedDate = new Date(date);
    this.setState({ endDate: endSelectedDate });
    let months =
      endSelectedDate.getMonth() === 0
        ? `0${1}`
        : endSelectedDate.getMonth() + 1 < 10
        ? "0" + (endSelectedDate.getMonth() + 1)
        : endSelectedDate.getMonth() + 1;
    let days =
      endSelectedDate.getDate() === 0
        ? endSelectedDate.getDate() + "0"
        : endSelectedDate.getDate() < 10
        ? "0" + endSelectedDate.getDate()
        : endSelectedDate.getDate();
    let hours =
      endSelectedDate.getHours() === 0
        ? endSelectedDate.getHours() + "0"
        : endSelectedDate.getHours() < 10
        ? "0" + endSelectedDate.getHours()
        : endSelectedDate.getHours();
    let minutes =
      endSelectedDate.getMinutes() === 0
        ? endSelectedDate.getMinutes() + "0"
        : endSelectedDate.getMinutes() < 10
        ? "0" + endSelectedDate.getMinutes()
        : endSelectedDate.getMinutes();
    let seconds =
      endSelectedDate.getSeconds() === 0
        ? endSelectedDate.getSeconds() + "0"
        : endSelectedDate.getSeconds() < 10
        ? "0" + endSelectedDate.getSeconds()
        : endSelectedDate.getSeconds();
    this.setState({
      endFormatted: `${endSelectedDate.getFullYear()}-${months}-${days}T${hours}:${minutes}:${seconds}Z`,
      endUnix: unixEndDate
    });
  };

  onHandleSubmit = (event, makecall) => {
    event.preventDefault();
    const {
      location,
      startFormatted,
      term,
      endFormatted,
      endUnix,
      startUnix,
      radius
    } = this.state;
    if (
      term === "" &&
      location === "" &&
      startFormatted === "" &&
      endFormatted === ""
    ) {
      alert("Must enter in a term, times, and location");
    } else if (
      term === "" &&
      location === "" &&
      startFormatted !== "" &&
      endFormatted !== ""
    ) {
      alert("Must enter in a term and location");
    } else if (
      startFormatted === "" &&
      endFormatted === "" &&
      location === "" &&
      term !== ""
    ) {
      alert("Must enter in times and location");
    } else if (
      startFormatted === "" &&
      endFormatted === "" &&
      term === "" &&
      location !== ""
    ) {
      alert("Must enter in times and term");
    } else if (
      term === "" &&
      startFormatted !== "" &&
      endFormatted !== "" &&
      location !== ""
    ) {
      alert("Must enter in a term.");
    } else if (
      startFormatted === "" &&
      endFormatted === "" &&
      term !== "" &&
      location !== ""
    ) {
      alert("Must enter times");
    } else if (
      location === "" &&
      startFormatted !== "" &&
      endFormatted !== "" &&
      term !== ""
    ) {
      alert("Must enter in a location");
    } else if (endFormatted === "") {
      alert("Must enter in a rough end time.");
    } else {
      makecall(
        term,
        location,
        startFormatted,
        endFormatted,
        radius,
        endUnix,
        startUnix
      );
    }
    this.setState({
      term: "",
      location: "",
      endFormatted: "",
      endUnix: null,
      startUnix: null,
      startFormatted: "",
      radius: ""
    });
  };

  renderVenuesSearch = () => {
    const { renderVenuesSearch } = this.state;
    if (renderVenuesSearch) {
      return <VenuesSearch></VenuesSearch>;
    } else {
      return;
    }
  };

  render() {
    console.log(this.state);
    return (
      <AppContext.Consumer>
        {value => {
          return (
            <div className="searchbox">
              Search for Places and Events
              <br />
              <br />
              <form action="">
                <VenuesSearch
                  updateTextInput={this.updateTextInput}
                  term={this.state.term}
                ></VenuesSearch>
                {/* <label htmlFor="">
                  What type of places are you looking for?
                </label>
                <input
                  type="text"
                  name="term"
                  value={this.state.term}
                  placeholder="Bars, restaurants, lounges, etc."
                  onChange={e => this.updateTextInput(e)}
                /> */}
                <br />
                <label htmlFor="">Where are you meeting?</label>
                <input
                  name="location"
                  type="text"
                  autoComplete="off"
                  placeholder="ex. 90015, Los Angeles, CA"
                  value={this.state.location}
                  onChange={e => this.updateTextInput(e)}
                />
                <br />
                <label htmlFor="">When are you meeting?</label>
                <DatePicker
                  name="date"
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}
                  autoComplete="off"
                  showTimeSelect
                  dateFormat="Pp"
                ></DatePicker>
                <br />
                <label htmlFor="">When is the end of the date?</label>
                <DatePicker
                  name="date"
                  autoComplete="off"
                  selected={this.state.endDate}
                  onChange={this.handleEndDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                ></DatePicker>
                <br />
                <label htmlFor="">What's the area of your search?</label>
                <select name="radius" id="" onChange={this.handleRadiusChange}>
                  <option value="none">Select miles...</option>
                  <option value="1610">Within 1 mile</option>
                  <option value="8050">Within 5 miles</option>
                  <option value="16100">Within 10 miles</option>
                  <option value="40250">Within 25 miles</option>
                </select>
                <button onClick={e => this.onHandleSubmit(e, value.makeCall)}>
                  Submit
                </button>
              </form>
              <br />
              <br />
              <label htmlFor="">Just looking for places?</label>
              <input type="radio" />
              <br />
              <label htmlFor="">Just events?</label>
              <input type="radio" onChange={this.VenuesSearch} />
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default SearchBox;
// import React, { Component } from "react";
// import "./SearchBox.css";

// class SearchBox extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return <div className="searchbox">
//       <span></span>
//     </div>;
//   }
// }

// export default SearchBox;
