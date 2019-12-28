import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import { Part } from "../Part";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Parts.css";

class Parts extends Component {
  state = {
    dropdown: true
  };

  triggerDropdown = event => {
    event.preventDefault();
    let { dropdown } = this.state;
    dropdown === false
      ? this.setState({ dropdown: true })
      : this.setState({ dropdown: false });
  };
  applyTransitions = array => {
    return array.map(part => (
      <CSSTransition key={part.id} timeout={400} classNames="slide-transition">
        <li key={part.id}>
          <Part Part={part}></Part>
        </li>
      </CSSTransition>
    ));
  };

  renderPartsNotifications = list => {
    if (list.length > 0) {
      return <div className="parts-notifications">{list.length}</div>;
    } else if (list.length > 10) {
      return <div className="parts-notificaitons">10+</div>;
    }
  };

  render() {
    const { Parts } = this.props;
    return (
      <React.Fragment>
        <div className="parts-box" onClick={e => this.triggerDropdown(e)}>
          {this.renderPartsNotifications(Parts)}
          Parts
        </div>

        <div className="parts-dropdown scrollbar">
          <div className="parts-wrapper">
            <ul className="list">
              <TransitionGroup>{this.applyTransitions(Parts)}</TransitionGroup>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Parts;
