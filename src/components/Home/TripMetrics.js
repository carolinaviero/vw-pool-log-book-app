import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./TripMetrics.css";

class TripMetrics extends React.Component {
  render() {
    const { filterByCar, handleFilterByCar, carMetrics } = this.props;

    // handleFilterByCar = (e) => {
    //     this.props.onFilterByCar(e.target.value);
    // };

    return (
      <>
        <div className="button">
          <Link to="/">HOME</Link>
        </div>
        <h1>Metrics</h1>
        <h2>Filter by car:</h2>
        <select
          className="car-or-driver-metrics-select"
          onChange={e => handleFilterByCar(e.target.value)}
        >
          {carMetrics.length &&
            carMetrics
              // get all unique drivers in trips and render their names in the select
              .reduce(
                (acc, curr) => [
                  ...acc,
                  acc.includes(curr.plate) ? null : curr.plate
                ],
                []
              )
              .map(
                plate =>
                  plate && (
                    <option key={plate} value={plate}>
                      {plate}
                    </option>
                  )
              )}
        </select>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Distance per month (Km)</th>
            </tr>
          </thead>
          <tbody>
            {carMetrics.length &&
              carMetrics
                .filter(metric => metric.plate === filterByCar)
                .map(metric => (
                  <tr>
                    <td>
                      {moment(metric.month, "M").format("MMM") +
                        ` - ${metric.year}`}
                    </td>
                    <td>{metric.totalMileage}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </>
    );
  }
}
export default TripMetrics;
