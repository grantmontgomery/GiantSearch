import React, { Component } from "react";
import "./EventsSearch.css";

class EventsSearch extends Component {
  state = {};
  render() {
    const { categoryEventSearch, eventCategory } = this.props;
    return (
      <React.Fragment>
        <label htmlFor="">What type of events are you looking for?</label>
        <select
          name=""
          id=""
          value={eventCategory}
          onChange={categoryEventSearch}
        >
          <option value="">Select a category (Optional)</option>
          <option value="All">All</option>
          <option value="Music">Music</option>
          <option value="Nightlife">Nightlife</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Film">Film</option>
          <option value="Sports & Active Lifestyle">
            Sports & Active Lifestyle
          </option>
          <option value="Festivals & Fairs">Festivals & Fairs</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Other">Other</option>
        </select>
      </React.Fragment>
    );
  }
}

export default EventsSearch;
