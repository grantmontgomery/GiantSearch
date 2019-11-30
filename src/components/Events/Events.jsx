import React, { Component } from "react";
import { Result } from "../Result";
import "./Events.css";

class Events extends Component {
  constructor(props) {
    super(props);
  }

  displayNext = event => {
    event.preventDefault();
  };

  displayPrevious = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="events">
        <button onClick={e => this.displayNext(e)}></button>
        <ul>
          {this.props.children.map(result => {
            return (
              <li key={result.id}>
                <Result Result={result}></Result>
              </li>
            );
          })}
        </ul>
        <button onClick={e => this.displayPrevious(e)}></button>
      </div>
    );
  }
}

export default Events;
