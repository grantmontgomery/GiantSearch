import React, { Component } from "react";
import "./Part.css";

class Part extends Component {
  state = {};
  render() {
    return (
      <div className="part-wrapper">
        <div className="part-image-wrapper">
          <img src={this.props.Part.image} alt="" />
        </div>
        <span>{this.props.Part.name}</span>
      </div>
    );
  }
}

export default Part;
