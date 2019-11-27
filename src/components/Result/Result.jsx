import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddRemove: "+",
      buttonSwitch: "add"
    };
  }

  VenueOrEvent(props) {
    console.log(props);
    props.result.type === "venue"
      ? this.setState({
          name: props.result.name,
          location: props.result.location,
          rating: props.result.rating
        })
      : this.setState({
          name: props.result.Result.name,
          date: props.result.Result.dates.start.localDate,
          time: props.result.Result.dates.start.localTime,
          venue: props.result.Result._embedded.venues[0].name
        });
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

  venueRender = () => {
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
  };

  eventRender = () => {
    return (
      <AppContext.Consumer>
        {value => (
          <div className="resultBox">
            <img src={this.props.result.Result.images[0].url} alt="" />
            <p>{this.props.result.Result.name}</p>
            <p>{this.props.result.Result.dates.start.localDate}</p>
            <p>{this.props.result.Result.dates.start.localTime}</p>
            <p>{this.props.result.Result._embedded.venues[0].name}</p>
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
  };

  render() {
    return this.props.result.type === "venue"
      ? this.venueRender()
      : this.eventRender();
  }
}
export default Result;
