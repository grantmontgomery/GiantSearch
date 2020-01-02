import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    if (props.Result.type === "venue") {
      this.state = {
        AddRemove: "+",
        buttonSwitch: "add",
        name: props.Result.name,
        image: props.Result.image_url,
        id: props.Result.id,
        location: props.Result.location,
        animate: "",
        type: props.Result.type,
        price: props.Result.price,
        rating: props.Result.rating
      };
    } else {
      if (props.Result.source === "ticketmaster") {
        "priceRanges" in props.Result
          ? (this.state = {
              name: props.Result.name,
              date: props.Result.dates.start.localDate,
              time: props.Result.dates.start.localTime,
              animate: "",
              id: props.Result.id,
              type: props.Result.type,
              image: props.Result.images[0].url,
              venue: props.Result._embedded.venues[0].name,
              price: props.Result.priceRanges[0].min,
              source: props.Result.source,
              AddRemove: "+",
              buttonSwitch: "add"
            })
          : (this.state = {
              name: props.Result.name,
              date: props.Result.dates.start.localDate,
              time: props.Result.dates.start.localTime,
              id: props.Result.id,
              animate: "",
              image: props.Result.images[0].url,
              type: props.Result.type,
              source: props.Result.source,
              venue: props.Result._embedded.venues[0].name,
              AddRemove: "+",
              buttonSwitch: "add"
            });
      } else {
        this.state = {
          name: props.Result.name,
          date: props.Result.time_start,
          animate: "",
          id: props.Result.id,
          image: props.Result.image_url,
          type: props.Result.type,
          // location: `${props.Result.location.address1.toLowerCase()}, ${
          //   props.Result.location.city
          // }`,
          source: props.Result.source,
          AddRemove: "+",
          buttonSwitch: "add"
        };
      }
    }
  }

  flipCard = event => {
    event.preventDefault();
    const { animate } = this.state;
    const { target } = event;
    const resultCards = document.getElementsByClassName("resultBox");
    if (
      target.className !== "add" &&
      target.className !== "remove" &&
      target.className !== "url"
    ) {
      animate === ""
        ? this.setState({ animate: "flip" })
        : this.setState({ animate: "" });
    }
  };

  changeButton = (addfunction, removefunction) => {
    if (this.state.AddRemove === "+") {
      const newState = {};
      Object.keys(this.state)
        .filter(key => key !== "AddRemove" && key !== "buttonSwitch")
        .forEach(key => (newState[key] = this.state[key]));
      addfunction(newState);
      this.setState({ AddRemove: "-", buttonSwitch: "remove" });
    } else {
      removefunction(this.state.id);
      this.setState({ AddRemove: "+", buttonSwitch: "add" });
    }
  };

  venueRender = () => {
    return (
      <AppContext.Consumer>
        {value => (
          <div
            className={`resultBox ${this.state.animate}`}
            onClick={this.flipCard}
          >
            <div className="result-inner">
              <div className="result-front">
                {" "}
                <div className="image-wrapper">
                  <img src={this.props.Result.image_url} className="" alt="" />
                </div>
                <button
                  className={this.state.buttonSwitch}
                  onClick={() =>
                    this.changeButton(value.addPart, value.removePart)
                  }
                >
                  {this.state.AddRemove}
                </button>
                <div className="text-wrapper">
                  <ul>
                    <li>
                      <a
                        href={this.props.Result.url}
                        className="url"
                        target="_blank"
                      >
                        {this.props.Result.name}
                      </a>
                    </li>
                    <li>{this.props.Result.location.city}</li>
                    <li>{this.props.Result.rating}</li>
                    <li>{this.props.Result.price}</li>
                  </ul>
                </div>
              </div>
              <div className="result-back">
                <p></p>
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  };
  renderPrice = () => {
    if ("price" in this.state) {
      return <li>Starting at: ${this.state.price}.00</li>;
    }
  };

  eventRender = () => {
    if (this.state.source === "ticketmaster") {
      return (
        <AppContext.Consumer>
          {value => (
            <div
              className={`resultBox ${this.state.animate}`}
              onClick={this.flipCard}
            >
              <div className="result-inner">
                <div className="result-front">
                  <div className="image-wrapper">
                    <img src={this.props.Result.images[0].url} alt="" />
                  </div>
                  <button className="more-info">...</button>
                  <button
                    className={this.state.buttonSwitch}
                    onClick={() =>
                      this.changeButton(value.addPart, value.removePart)
                    }
                  >
                    {this.state.AddRemove}
                  </button>
                  <div className="text-wrapper">
                    <ul>
                      <li>
                        <a
                          href={this.props.Result.url}
                          className="url"
                          target="_blank"
                        >
                          {this.props.Result.name}
                        </a>
                      </li>
                      <li>{this.props.Result.dates.start.localDate}</li>
                      <li>{this.props.Result.dates.start.localTime}</li>
                      <li>{this.props.Result._embedded.venues[0].name}</li>
                      {this.renderPrice()}
                    </ul>
                  </div>
                </div>
                <div className="result-back"></div>
              </div>
            </div>
          )}
        </AppContext.Consumer>
      );
    } else {
      return (
        <AppContext.Consumer>
          {value => (
            <div
              className={`resultBox ${this.state.animate}`}
              onClick={this.flipCard}
            >
              <div className="result-inner">
                <div className="result-front">
                  <div className="image-wrapper">
                    <img src={this.props.Result.image_url} alt="" />
                  </div>
                  <button
                    className={this.state.buttonSwitch}
                    onClick={() =>
                      this.changeButton(value.addPart, value.removePart)
                    }
                  >
                    {this.state.AddRemove}
                  </button>
                  <div className="text-wrapper">
                    <ul>
                      <li>
                        <a
                          className="url"
                          href={this.props.Result.event_site_url}
                          target="_blank"
                        >
                          {this.props.Result.name}
                        </a>
                      </li>
                      <li>{this.props.Result.time_start}</li>
                      {/* <li>{`${this.props.Result.location.address1.toLowerCase()}, ${
                        this.props.Result.location.city
                      }`}</li> */}
                      <li>{`${this.props.Result.location.city}`}</li>
                    </ul>
                  </div>
                </div>
                <div className="result-back"></div>
              </div>
            </div>
          )}
        </AppContext.Consumer>
      );
    }
  };
  render() {
    return this.props.Result.type === "venue"
      ? this.venueRender()
      : this.eventRender();
  }
}
export default Result;
