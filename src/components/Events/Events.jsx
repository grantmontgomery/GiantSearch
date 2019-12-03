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
    const { Events } = this.props;
    this.state.index + 1 < Events.length
      ? this.setState(() => ({ index: this.state.index + 1 }))
      : this.setState(() => ({ index: 0 }));
  };

  previousItems = event => {
    const { Events } = this.props;
    event.preventDefault();
    this.state.index > 0
      ? this.setState(() => ({ index: this.state.index - 1 }))
      : this.setState(() => ({ index: Events.length - 1 }));
  };

  eventsRender = () => {
    const { Events } = this.props;
    const { index } = this.state;
    if (Events.length > 0) {
      return (
        <div className="events-slider">
          <div className="events-wrapper">
            {Events.map(result => {
              return <Result key={result.id} Result={result}></Result>;
            })}
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="events">
        {" "}
        <button className="previous" onClick={e => this.previousItems(e)}>
          {"<"}
        </button>
        {this.eventsRender()}{" "}
        <button className="next" onClick={e => this.nextItems(e)}>
          {">"}
        </button>
      </div>
    );
  }
}

export default Events;
