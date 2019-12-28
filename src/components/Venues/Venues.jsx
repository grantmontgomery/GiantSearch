import React, { Component } from "react";
import { Result } from "../Result";
import { AppContext } from "../../AppContext";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

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

  renderIsLoading = () => {
    return <div>Venues Loading...</div>;
  };

  previousItems = event => {
    event.preventDefault();
    let { index } = this.state;
    index > 0
      ? this.setState(() => ({ index: index - 4 }))
      : this.setState(() => ({ index: 0 }));
  };

  // applyTransitions = () => {
  //   const { Venues } = this.props;
  //   return Venues.map(result => (
  //     <CSSTransition key={result.id} timeout={300} classNames="enter-transitions">
  //       <Result key={result.id} Result={result}></Result>;
  //     </CSSTransition>
  //   ));
  // };

  venuesRender = () => {
    const { Venues } = this.props;
    const { index } = this.state;
    if (Venues.length > 0) {
      return (
        <div className="venues-slider">
          <button id="previous" onClick={e => this.previousItems(e)}>
            {"<"}
          </button>
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
          if (value.venuesLoading) {
            return <div className="venues">Venues are loading...</div>;
          } else {
            return <div className="venues">{this.venuesRender()}</div>;
          }
        }}
      </AppContext.Consumer>
    );
  }
}

export default Venues;
