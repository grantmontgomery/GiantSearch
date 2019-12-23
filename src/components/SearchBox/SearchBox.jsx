import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchBox.css";

require("dotenv").config();

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateTextInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRadiusChange = event => {
    const { target } = event;
    const valuetoInt = parseInt(target.value);
    this.setState({ [target.name]: valuetoInt });
  };

  handleDateChange = date => {
    const selectedDate = new Date(date);
    this.setState({ date: selectedDate });
    let months =
      selectedDate.getMonth() === 0
        ? `0${1}`
        : selectedDate.getMonth() + 1 < 10
        ? "0" + (selectedDate.getMonth() + 1)
        : selectedDate.getMonth() + 1;
    let days =
      selectedDate.getDate() === 0
        ? selectedDate.getDate() + "0"
        : selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let hours =
      selectedDate.getHours() === 0
        ? selectedDate.getHours() + "0"
        : selectedDate.getHours() < 10
        ? "0" + selectedDate.getHours()
        : selectedDate.getHours();
    let minutes =
      selectedDate.getMinutes() === 0
        ? selectedDate.getMinutes() + "0"
        : selectedDate.getMinutes() < 10
        ? "0" + selectedDate.getMinutes()
        : selectedDate.getMinutes();
    let seconds =
      selectedDate.getSeconds() === 0
        ? selectedDate.getSeconds() + "0"
        : selectedDate.getSeconds() < 10
        ? "0" + selectedDate.getSeconds()
        : selectedDate.getSeconds();
    this.setState({
      startFormatted: `${selectedDate.getFullYear()}-${months}-${days}T${hours}:${minutes}:${seconds}Z`
    });
    //Endformat of next day
    let nextDay = new Date(date.setDate(date.getDate() + 1));
    let endMonths =
      nextDay.getMonth() === 0
        ? `0${1}`
        : nextDay.getMonth() + 1 < 10
        ? "0" + (nextDay.getMonth() + 1)
        : nextDay.getMonth() + 1;
    let endDays =
      nextDay.getDate() === 0
        ? nextDay.getDate() + "0"
        : nextDay.getDate() < 10
        ? "0" + nextDay.getDate()
        : nextDay.getDate();
    let endHours =
      nextDay.getHours() === 0
        ? nextDay.getHours() + "0"
        : nextDay.getHours() < 10
        ? "0" + nextDay.getHours()
        : nextDay.getHours();
    let endMinutes =
      nextDay.getMinutes() === 0
        ? nextDay.getMinutes() + "0"
        : nextDay.getMinutes() < 10
        ? "0" + nextDay.getMinutes()
        : nextDay.getMinutes();
    let endSeconds =
      nextDay.getSeconds() === 0
        ? nextDay.getSeconds() + "0"
        : nextDay.getSeconds() < 10
        ? "0" + nextDay.getSeconds()
        : nextDay.getSeconds();

    date.getHours() > 15
      ? this.setState({
          endFormatted: `${nextDay.getFullYear()}-${endMonths}-${endDays}T${endHours}:${endMinutes}:${endSeconds}Z`
        })
      : this.setState({
          endFormatted: `${date.getFullYear()}-${months}-${days}T${hours +
            8}:${minutes}:${seconds}Z`
        });
  };

  onHandleSubmit = (event, makecall) => {
    event.preventDefault();
    const { location, startFormatted, term, endFormatted, radius } = this.state;
    if (term === "" && location === "" && startFormatted === "") {
      alert("Must enter in a term, time, and location");
    } else if (term === "" && location === "" && startFormatted !== "") {
      alert("Must enter in a term and location");
    } else if (startFormatted === "" && location === "" && term !== "") {
      alert("Must enter in a time and location");
    } else if (startFormatted === "" && term === "" && location !== "") {
      alert("Must enter in a time and term");
    } else if (term === "" && startFormatted !== "" && location !== "") {
      alert("Must enter in a term.");
    } else if (startFormatted === "" && term !== "" && location !== "") {
      alert("Must enter in a time");
    } else if (location === "" && startFormatted !== "" && term !== "") {
      alert("Must enter in a location");
    } else {
      makecall(term, location, startFormatted, endFormatted, radius);
    }
    this.setState({ term: "", location: "", startFormatted: "", radius: "" });
  };

  render() {
    console.log(this.state);
    return (
      <AppContext.Consumer>
        {value => {
          return (
            <div className="searchbox">
              <form action="">
                <label htmlFor="">Search</label>
                <input
                  type="text"
                  name="term"
                  value={this.state.term}
                  onChange={e => this.updateTextInput(e)}
                />
                <br />
                <label htmlFor="">Location</label>
                <input
                  name="location"
                  type="text"
                  placeholder="ex. 90015, Los Angeles, CA"
                  value={this.state.location}
                  onChange={e => this.updateTextInput(e)}
                />
                <br />
                <label htmlFor="">Date/Time</label>
                <DatePicker
                  name="date"
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                ></DatePicker>
                <br />
                <label htmlFor="">Radius</label>
                <select name="radius" id="" onChange={this.handleRadiusChange}>
                  <option value="none">Select miles...</option>
                  <option value="1610">Within 1 mile</option>
                  <option value="8050">Within 5 miles</option>
                  <option value="16100">Within 10 miles</option>
                  <option value="40250">Within 25 miles</option>
                  <option value="80500">Within 50 miles</option>
                </select>
                <button onClick={e => this.onHandleSubmit(e, value.makeCall)}>
                  Submit
                </button>
              </form>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default SearchBox;
