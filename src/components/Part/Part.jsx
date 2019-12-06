import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./Part.css";

class Part extends Component {
  state = {};

  renderType = () => {
    if (this.props.Part.type === "venue") {
      return (
        <AppContext.Consumer>
          {value => {
            return (
              <div className="part-wrapper">
                <div className="part-image-wrapper">
                  <img src={this.props.Part.image} alt="" />
                </div>
                <div className="part-text-wrapper">
                  <span>{this.props.Part.name}</span>
                  <br />
                  <span>{this.props.Part.location.city}</span>
                  <br />
                  <span>{this.props.Part.price}</span>
                </div>
                <button
                  className="remove-part"
                  onClick={() => value.removePart(this.props.Part.id)}
                >
                  {"-"}
                </button>
              </div>
            );
          }}
        </AppContext.Consumer>
      );
    } else {
      return (
        <AppContext.Consumer>
          {value => {
            return (
              <div className="part-wrapper">
                <div className="part-image-wrapper">
                  <img src={this.props.Part.image} alt="" />
                </div>
                <div className="part-text-wrapper">
                  <span>{this.props.Part.name}</span>
                  <br />
                  <span>{this.props.Part.venue}</span>
                  <br />
                  <span>{`${this.props.Part.date} ${this.props.Part.time}`}</span>
                </div>
                <button
                  className="remove-part"
                  onClick={() => value.removePart(this.props.Part.id)}
                >
                  {"-"}
                </button>
              </div>
            );
          }}
        </AppContext.Consumer>
      );
    }
  };

  render() {
    return this.renderType();
  }
}

export default Part;
