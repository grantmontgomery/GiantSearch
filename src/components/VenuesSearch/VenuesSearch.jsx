import React, { Component } from "react";

class VenuesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  handleUpdate = event => {
    const { target } = event;
    const { value } = target;
    this.setState({ term: value });
  };

  render() {
    const { term } = this.state;
    return (
      <div className="venuessearch-wrapper">
        <input type="text" value={term} onChange={this.handleUpdate} />
      </div>
    );
  }
}

export default VenuesSearch;
