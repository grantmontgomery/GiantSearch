import React, { Component } from "react";

class VenuesSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateTextInput, term } = this.props;
    return (
      <React.Fragment>
        <label htmlFor="">What type of places are you looking for?</label>
        <input
          type="text"
          name="term"
          value={term}
          placeholder="Bars, restaurants, lounges, etc."
          onChange={updateTextInput}
        />
      </React.Fragment>
    );
  }
}

export default VenuesSearch;
