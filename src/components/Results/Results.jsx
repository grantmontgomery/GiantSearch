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
      // <div className="resultsBox">
      //   {this.props.Results.map(result => {
      //     return <Result key={result.id} result={result}></Result>;
      //   })}
      // </div>
      <div>
        <p>Under Construction until this.props.Results is solved.</p>
      </div>
    );
  }
}

export default Results;
