import React, { Component } from "react";
import { Result } from "../Result";
import "./Venues.css";

class Venues extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="venues">
        <ul>
          {this.props.children.map(result => {
            return (
              <li key={result.id}>
                <Result Result={result}></Result>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Venues;
