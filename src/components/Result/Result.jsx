import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.result.name,
      location: this.props.result.location,
      rating: this.props.result.rating,
      AddRemove: "+",
      buttonSwitch: "add"
    };
  }

  changeButton = (addfunction, removefunction) => {
    if (this.state.AddRemove === "+") {
      addfunction(this.state);
      this.setState({ AddRemove: "-", buttonSwitch: "remove" });
    } else {
      removefunction(this.state.name);
      this.setState({ AddRemove: "+", buttonSwitch: "add" });
    }
  };

  render() {
    return (
      <AppContext.Consumer>
        {value => (
          <div className="resultBox">
            <img src={this.props.result.image_url} className="" alt="" />
            <ul>
              <li>{this.props.result.name}</li>
              <li>{this.props.result.location.city}</li>
              <li>{this.props.result.rating}</li>
            </ul>
            <button
              className={this.state.buttonSwitch}
              onClick={() =>
                this.changeButton(value.addVenue, value.removeVenue)
              }
            >
              {this.state.AddRemove}
            </button>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}
export default Result;
