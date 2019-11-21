import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./SearchBox.css";

require("dotenv").config();

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: ""
    };
  }

  updateTextInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onHandleSubmit = (event, makecall) => {
    event.preventDefault();
    if (this.state.term === "" && this.state.location === "") {
      alert("Must enter in a term and location");
    } else if (this.state.term === "" && this.state.location !== "") {
      alert("Must enter in a term.");
    } else if (this.state.location === "" && this.state.term !== "") {
      alert("Must enter in a location");
    } else {
      makecall(this.state.term, this.state.location);
    }
    this.setState({ term: "", location: "" });
  };

  render() {
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
                  value={this.state.location}
                  onChange={e => this.updateTextInput(e)}
                />
                <br />
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
