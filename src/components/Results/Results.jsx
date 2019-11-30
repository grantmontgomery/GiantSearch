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
      <div className="resultsBox">
        <Venues>
          {this.props.Results.filter(result => result.type === "venue")}
        </Venues>
        <br />
        <Events>
          {this.props.Results.filter(result => result.type === "event")}
        </Events>
      </div>
    );
  }
}

export default Results;
