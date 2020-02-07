import React from "react";
import { Link, Router } from "react-router-dom";

class TripMetrics extends React.Component {
  render() {
    return (
      <>
        <div className="button">
          <Link to="/">HOME</Link>
        </div>
        <h1>Metrics</h1>
        <h2>Filter by car or by person.</h2>
        <br />
      </>
    );
  }
}
export default TripMetrics;
