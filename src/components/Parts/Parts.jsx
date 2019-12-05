import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import { Part } from "../Part";
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

  renderDropdown = list => {
    let { dropdown } = this.state;
    if (dropdown === false) {
      return (
        <div className="parts-dropdown scrollbar">
          <div className="parts-wrapper">
            <ul>
              {list.Parts.map(part => (
                <li>
                  <Part Part={part}></Part>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  render() {
    console.log(this.state.dropdown);
    return (
      <AppContext.Consumer>
        {value => (
          <React.Fragment>
            <div
              className="parts-box"
              onClick={e => this.triggerDropdown(e)}
            ></div>
            {this.renderDropdown(value)}
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Parts;
