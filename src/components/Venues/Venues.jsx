import React, { Component } from "react";
import { Result } from "../Result";
import "./Venues.css";

class Venues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  nextItems = event => {
    event.preventDefault();
    const { venuesDivided } = this.props;
    this.state.index + 1 < venuesDivided.length
      ? this.setState(() => ({ index: this.state.index + 1 }))
      : this.setState(() => ({ index: 0 }));
  };

  previousItems = event => {
    const { venuesDivided } = this.props;
    event.preventDefault();
    this.state.index > 0
      ? this.setState(() => ({ index: this.state.index - 1 }))
      : this.setState(() => ({ index: venuesDivided.length - 1 }));
  };
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
