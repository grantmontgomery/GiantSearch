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
    const { Venues } = this.props;
    let { index } = this.state;
    index + 4 <= Venues.length - 4
      ? this.setState(() => ({ index: index + 4 }))
      : this.setState(() => ({ index: index + (Venues.length - 4 - index) }));
  };

  previousItems = event => {
    event.preventDefault();
    let { index } = this.state;
    index > 0
      ? this.setState(() => ({ index: index - 4 }))
      : this.setState(() => ({ index: 0 }));
  };
  venuesRender = () => {
    const { Venues } = this.props;
    const { index } = this.state;
    if (Venues.length > 0) {
      return (
        <div className="venues-slider">
          <div
            className="venues-wrapper"
            style={{
              transform: `translateX(-${index * (100 / Venues.length)}%)`
            }}
          >
            {Venues.map(result => {
              return <Result key={result.id} Result={result}></Result>;
            })}
          </div>
        </div>
      );
    }
  };

  render() {
    console.log(this.state.index);
    return (
      <div className="venues">
        <button className="previous" onClick={e => this.previousItems(e)}>
          {"<"}
        </button>
        {this.venuesRender()}
        <button className="next" onClick={e => this.nextItems(e)}>
          {">"}
        </button>
      </div>
    );
  }
}

export default Venues;
