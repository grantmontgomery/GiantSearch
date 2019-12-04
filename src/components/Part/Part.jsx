import React, { Component } from "react";
import "./Part.css";

class Part extends Component {
  state = {};

  renderType = () => {
    if (this.props.Part.type === "venue") {
      return (
        <div className="part-wrapper">
          <div className="part-image-wrapper">
            <img src={this.props.Part.image} alt="" />
          </div>
          <div className="part-text-wrapper">
            <span> {this.props.Part.name}</span>
            <br />
            <ul>
              <li>{this.props.Part.location.city}</li>
              <li>{this.props.Part.price}</li>
            </ul>

            {/* <ul>
              <li>{this.props.Part.name}</li>
              <li>{this.props.Part.location.city}</li>
              <li>{this.props.Part.price}</li>
            </ul> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="part-wrapper">
          <div className="part-image-wrapper">
            <img src={this.props.Part.image} alt="" />
          </div>
          <div className="part-text-wrapper">
            <span>{this.props.Part.name}</span>
          </div>
        </div>
      );
    }
  };

  render() {
    return this.renderType();
  }
}

export default Part;
