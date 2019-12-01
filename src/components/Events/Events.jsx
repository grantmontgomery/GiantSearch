import React, { Component } from "react";
import { Result } from "../Result";
import "./Events.css";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  nextItems = event => {
    event.preventDefault();
    const { eventsDivided } = this.props;
    this.state.index + 1 < eventsDivided.length
      ? this.setState(() => ({ index: this.state.index + 1 }))
      : this.setState(() => ({ index: 0 }));
  };

  previousItems = event => {
    const { eventsDivided } = this.props;
    event.preventDefault();
    this.state.index > 0
      ? this.setState(() => ({ index: this.state.index - 1 }))
      : this.setState(() => ({ index: eventsDivided.length - 1 }));
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
