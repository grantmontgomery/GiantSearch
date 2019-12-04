import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./Parts.css";

class Parts extends Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {value => (
          <div className="parts-box">
            <div className="parts-dropdown">
              <ul>
                {value.Parts.map(part => (
                  <li>
                    <div className="part-image-wrapper">
                      <img src={part.image} alt="" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Parts;
