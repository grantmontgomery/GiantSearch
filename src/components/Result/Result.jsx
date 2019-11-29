import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    props.Result.type === "venue"
      ? (this.state = {
          AddRemove: "+",
          buttonSwitch: "add",
          name: props.Result.name,
          location: props.Result.location,
          rating: props.Result.rating
        })
      : "priceRanges" in props.Result
      ? (this.state = {
          name: props.Result.name,
          date: props.Result.dates.start.localDate,
          time: props.Result.dates.start.localTime,
          venue: props.Result._embedded.venues[0].name,
          price: props.Result.priceRanges[0].min,
          AddRemove: "+",
          buttonSwitch: "add"
        })
      : (this.state = {
          name: props.Result.name,
          date: props.Result.dates.start.localDate,
          time: props.Result.dates.start.localTime,
          venue: props.Result._embedded.venues[0].name,
          AddRemove: "+",
          buttonSwitch: "add"
        });
  }

  changeButton = (addfunction, removefunction) => {
    if (this.state.AddRemove === "+") {
      const newState = {};
      Object.keys(this.state)
        .filter(key => key !== "AddRemove" && key !== "buttonSwitch")
        .forEach(key => (newState[key] = this.state[key]));
      addfunction(newState);
      this.setState({ AddRemove: "-", buttonSwitch: "remove" });
    } else {
      removefunction(this.state.name);
      this.setState({ AddRemove: "+", buttonSwitch: "add" });
    }
  };

  venueRender = () => {
    return (
      <AppContext.Consumer>
        {value => (
          <div className="resultBox">
            <img src={this.props.Result.image_url} className="" alt="" />
            <ul>
              <li>{this.props.Result.name}</li>
              <li>{this.props.Result.location.city}</li>
              <li>{this.props.Result.rating}</li>
            </ul>
            <button
              className={this.state.buttonSwitch}
              onClick={() => this.changeButton(value.addPart, value.removePart)}
            >
              {this.state.AddRemove}
            </button>
          </div>
        )}
      </AppContext.Consumer>
    );
  };
  renderPrice = () => {
    if ("price" in this.state) {
      return <p>Starting ticket price: ${this.state.price}.00</p>;
    }
  };
  eventRender = () => {
    return (
      <AppContext.Consumer>
        {value => (
          <div className="resultBox">
            <img src={this.props.Result.images[0].url} alt="" />
            <p>{this.props.Result.name}</p>
            <p>{this.props.Result.dates.start.localDate}</p>
            <p>{this.props.Result.dates.start.localTime}</p>
            <p>{this.props.Result._embedded.venues[0].name}</p>
            {this.renderPrice()}
            <button
              className={this.state.buttonSwitch}
              onClick={() => this.changeButton(value.addPart, value.removePart)}
            >
              {this.state.AddRemove}
            </button>
          </div>
        )}
      </AppContext.Consumer>
    );
  };

  render() {
    return this.props.Result.type === "venue"
      ? this.venueRender()
      : this.eventRender();
  }
}
export default Result;
