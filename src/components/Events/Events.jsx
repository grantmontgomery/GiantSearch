import React, { Component } from "react";
import { Result } from "../Result";
import { AppContext } from "../../AppContext";
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
    let { index } = this.state;
    const { Events } = this.props;
    this.state.index + 4 <= Events.length - 4
      ? this.setState(() => ({ index: index + 4 }))
      : this.setState(() => ({ index: index + (Events.length - 4 - index) }));
  };

  previousItems = event => {
    event.preventDefault();
    let { index } = this.state;

    this.state.index - 4 > 0
      ? this.setState(() => ({ index: index - 4 }))
      : this.setState(() => ({ index: 0 }));
  };

  eventsRender = () => {
    const { Events } = this.props;
    const { index } = this.state;
    if (Events.length > 0) {
      return (
        <div className="events-slider">
          <button id="previous" onClick={e => this.previousItems(e)}>
            {"<"}
          </button>
          <div
            className="events-wrapper"
            style={{
              transform: `translateX(-${index * (100 / Events.length)}%)`
            }}
          >
            {Events.map(result => {
              return <Result key={result.id} Result={result}></Result>;
            })}
          </div>
          <button id="next" onClick={e => this.nextItems(e)}>
            {">"}
          </button>
        </div>
      );
    }
  };
  render() {
    return (
      <AppContext.Consumer>
        {value => {
          if (value.eventsLoading) {
            return <div className="events">Events are loading...</div>;
          } else {
            return <div className="events">{this.eventsRender()}</div>;
          }
        }}
      </AppContext.Consumer>
    );
  }
}

export default Events;
