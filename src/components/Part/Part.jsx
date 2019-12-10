import React, { Component } from "react";
import { AppContext } from "../../AppContext";
import "./Part.css";

class Part extends Component {
  constructor(props) {
    super(props);
    this.props.Part.type === "venue"
      ? (this.state = {
          image: this.props.Part.image,
          name: this.props.Part.name,
          city: this.props.Part.location.city,
          price: this.props.Part.price
        })
      : (this.state = {
          image: this.props.Part.image,
          name: this.props.Part.name,
          venue: this.props.Part.venue,
          date: this.props.Part.date,
          time: this.props.Part.time
        });
  }

  renderType = () => {
    if (this.props.Part.type === "venue") {
      return (
        <AppContext.Consumer>
          {value => {
            const { image, name, city, price } = this.state;
            return (
              <div className="part-wrapper">
                <div className="part-image-wrapper">
                  <img src={image} alt="" />
                </div>
                <div className="part-text-wrapper">
                  <span>{name}</span>
                  <br />
                  <span>{city}</span>
                  <br />
                  <span>{price}</span>
                </div>
                <button
                  className="remove-part"
                  onClick={() => value.removePart(this.props.Part.id)}
                >
                  {"-"}
                </button>
              </div>
            );
          }}
        </AppContext.Consumer>
      );
    } else {
      return (
        <AppContext.Consumer>
          {value => {
            const { image, name, venue, date, time } = this.state;
            return (
              <div className="part-wrapper">
                <div className="part-image-wrapper">
                  <img src={image} alt="" />
                </div>
                <div className="part-text-wrapper">
                  <span className="title">{name}</span>
                  <br />
                  <span className="details">{venue}</span>
                  <br />
                  <span className="details">{`${date} ${time}`}</span>
                </div>
                <button
                  className="remove-part"
                  onClick={() => value.removePart(this.props.Part.id)}
                >
                  {"-"}
                </button>
              </div>
            );
          }}
        </AppContext.Consumer>
      );
    }
  };

  render() {
    return this.renderType();
  }
}

export default Part;
