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
  venuesRender = () => {
    const { venuesDivided } = this.props;
    const { index } = this.state;
    if (venuesDivided.length > 0) {
      return (
        <React.Fragment>
          <button className="previous" onClick={e => this.previousItems(e)}>
            {"<"}
          </button>
          <ul>
            {venuesDivided[index].map(result => {
              return (
                <li key={result.id}>
                  <Result Result={result}></Result>
                </li>
              );
            })}
          </ul>
          <button className="next" onClick={e => this.nextItems(e)}>
            {">"}
          </button>
        </React.Fragment>
      );
    }
  };

  render() {
    return <div className="venues">{this.venuesRender()}</div>;
  }
}

export default Venues;
