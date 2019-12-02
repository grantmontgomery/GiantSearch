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

  eventsRender = () => {
    const { eventsDivided } = this.props;
    const { index } = this.state;
    if (eventsDivided.length > 0) {
      return (
        <React.Fragment>
          <button className="previous" onClick={e => this.previousItems(e)}>
            {"<"}
          </button>
          <ul>
            {eventsDivided[index].map(result => {
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
    console.log(this.props.eventsDivided);
    return <div className="events">{this.eventsRender()}</div>;
  }
}

export default Events;
