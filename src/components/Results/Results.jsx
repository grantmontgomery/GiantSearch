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
        <Venues Venues={this.props.Venues}></Venues>
        <br />
        <Events Events={this.props.Events}></Events>
      </React.Fragment>
    );
  }
}

export default Results;
