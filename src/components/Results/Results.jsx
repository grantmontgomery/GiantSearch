import React, { Component } from "react";
import { Venues } from "../Venues";
import { Events } from "../Events";
import "./Results.css";

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Venues venuesDivided={this.props.venuesDivided}>
          {this.props.Results.filter(result => result.type === "venue")}
        </Venues>
        <br />
        <Events eventsDivided={this.props.eventsDivided}>
          {this.props.Results.filter(result => result.type === "event")}
        </Events>
      </React.Fragment>
    );
  }
}

export default Results;
