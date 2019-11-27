import React, { Component } from "react";
import { Result } from "../Result";
import "./Results.css";

class Results extends Component {
  constructor(props) {
    super(props);
  }
  // venuesRender = () => {
  //   return (
  //     <div className="resultsBox">
  //       {this.props.Results.map(result => {
  //         return <Result key={result.id}> result={result}></Result>;
  //       })}
  //     </div>
  //   );
  // };

  // eventsRender

  render() {
    return (
      <div className="resultsBox">
        {this.props.Results.map(result => {
          return <Result key={result.id} Result={result}></Result>;
        })}
      </div>
    );
  }
}

export default Results;
