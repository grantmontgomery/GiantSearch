import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import DatePicker from "react-datepicker";
import { VenuesSearch } from "../VenuesSearch";
import { EventsSearch } from "../EventsSearch";
import { SearchSelect } from "../Logic";
import { EventCategorySearch } from "../Logic";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchBox.css";

require("dotenv").config();

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: "",
      renderVenuesSearch: true,
      renderEventsSearch: true,
      searchAll: true,
      justEvents: false,
      justVenues: false,
      eventCategory: "",
      radiusStr: "",
      yelpCategories: null,
      ticketmasterCategories: null,
      makeCall: false
    };
  }
  componentDidMount() {
    document.getElementById("searchAll").checked = true;
  }
  updateTextInput = event => {
    this.setState({ term: event.target.value });
  };

  setYelpCategory = input => {
    this.setState({ yelpCategories: [...input] });
  };

  setTicketMasterCategory = input => {
    this.setState({ ticketmasterCategories: [...input] });
  };

  categoryEventSearch = event => {
    const { target } = event;
    if (target.value !== "") {
      this.setState({ eventCategory: target.value });
      EventCategorySearch(
        target.value,
        this.setYelpCategory,
        this.setTicketMasterCategory
      );
    } else {
      this.setState({
        eventCategory: "",
        yelpCategories: null,
        ticketmasterCategories: null
      });
    }
  };

  updateLocation = event => {
    this.setState({ location: event.target.value });
  };

  handleRadiusChange = event => {
    const { target } = event;
    const valuetoInt = parseInt(target.value);
    this.setState({ radius: valuetoInt, radiusStr: target.value });
  };

  VenuesSearch = event => {
    const { target } = event;
    if (target === document.getElementById("justEvents")) {
      document.getElementById("justEvents").checked = true;
      document.getElementById("justVenues").checked = false;
      document.getElementById("searchAll").checked = false;
      this.setState({
        renderVenuesSearch: false,
        renderEventsSearch: true,
        justEvents: true,
        justVenues: false,
        searchAll: false
      });
    } else if (target === document.getElementById("justVenues")) {
      document.getElementById("justVenues").checked = true;
      document.getElementById("justEvents").checked = false;
      document.getElementById("searchAll").checked = false;
      this.setState({
        renderVenuesSearch: true,
        renderEventsSearch: false,
        justVenues: true,
        justEvents: false,
        searchAll: false
      });
    } else if (target === document.getElementById("searchAll")) {
      document.getElementById("searchAll").checked = true;
      document.getElementById("justEvents").checked = false;
      document.getElementById("searchAll").checked = false;
      this.setState({
        renderVenuesSearch: true,
        renderEventsSearch: true,
        justVenues: false,
        justEvents: false,
        searchAll: true
      });
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

  resetState = () => {
    this.setState({
      term: "",
      location: "",
      endFormatted: "",
      eventCategory: "",
      yelpCategories: null,
      ticketmasterCategories: null,
      endUnix: null,
      startUnix: null,
      radiusStr: "",
      startDate: "",
      endDate: "",
      startFormatted: "",
      radius: "",
      makeCall: false
    });
  };

  setMakeCall = () => {
    this.setState({ makeCall: true });
  };

  onHandleSubmit = (event, callAPIs) => {
    event.preventDefault();
    const { makeCall } = this.state;
    SearchSelect(this.setMakeCall, this.resetState, this.state);
    if (makeCall) {
      callAPIs(this.state);
    }
  };

  renderVenuesSearch = () => {
    const { renderVenuesSearch } = this.state;
    if (renderVenuesSearch) {
      return (
        <VenuesSearch
          updateTextInput={this.updateTextInput}
          term={this.state.term}
        ></VenuesSearch>
      );
    } else {
      return;
    }
  };

  renderEventsSearch = () => {
    const { renderEventsSearch, eventCategory } = this.state;
    if (renderEventsSearch) {
      return (
        <EventsSearch
          eventCategory={eventCategory}
          categoryEventSearch={this.categoryEventSearch}
        ></EventsSearch>
      );
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
              <span>What are you looking for?</span>
              <br />
              <label htmlFor="">I'm looking for anything.</label>
              <input type="radio" id="searchAll" onChange={this.VenuesSearch} />
              <br />
              <label htmlFor="">I'm just looking for cool places.</label>
              <input
                type="radio"
                id="justVenues"
                onChange={this.VenuesSearch}
              />
              <br />
              <label htmlFor="">I'm only looking for what's poppin'</label>
              <input
                type="radio"
                id="justEvents"
                onChange={this.VenuesSearch}
              />
              <br />
              <form
                action=""
                onSubmit={e => this.onHandleSubmit(e, value.callAPIs)}
              >
                {this.renderVenuesSearch()}
                <br />
                {this.renderEventsSearch()}

                <br />
                <label htmlFor="">Where are you meeting?</label>
                <input
                  name="location"
                  type="text"
                  autoComplete="off"
                  placeholder="ex. 90015, Los Angeles, CA"
                  value={this.state.location}
                  onChange={this.updateLocation}
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
                <select
                  name="radius"
                  id=""
                  value={this.state.radiusStr}
                  onChange={this.handleRadiusChange}
                >
                  <option value="">Select miles...</option>
                  <option value="1610">Within 1 mile</option>
                  <option value="8050">Within 5 miles</option>
                  <option value="16100">Within 10 miles</option>
                  <option value="40250">Within 25 miles</option>
                </select>
                <button onClick={e => this.onHandleSubmit(e, value.callAPIs)}>
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
