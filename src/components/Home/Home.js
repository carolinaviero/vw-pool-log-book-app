import React from "react";
import { Link } from "react-router-dom";
import List from "./List";
import "./Home.css";

class Home extends React.Component {
  handleFilterByDriver = e => {
    this.props.onFilterByDriver(e.target.value);
  };

  handleSortByDate = () => {
    this.props.onSortByDate();
  };

  render() {
    const {
      trips,
      tripsFilteredByDriver,
      isModalVisible,
      handleModalVisibility
    } = this.props;

    return (
      <>
        <h1>VWDS Car Pool</h1>
        <div className="button">
          <Link to="/booking">BOOK A TRIP</Link>
        </div>

        <br />
        <h2>Current Trips</h2>

        <div className="filters">
          <label class="driver-select" htmlFor="driverSelect">
            Filter by driver:{" "}
          </label>

          <select id="driverSelect" onChange={this.handleFilterByDriver}>
            <option defaultValue>All</option>
            {trips
              // get all unique drivers in trips and render their names in the select
              .reduce(
                (acc, curr) => [
                  ...acc,
                  acc.includes(curr.driver) ? null : curr.driver
                ],
                []
              )
              .sort()
              .map(
                driver =>
                  driver && (
                    <option key={driver} value={driver}>
                      {driver}
                    </option>
                  )
              )}
          </select>
          <div id="sort-by-date-filter" onClick={this.handleSortByDate}>Sort by date</div>
        </div>
        <List
          trips={tripsFilteredByDriver.length ? tripsFilteredByDriver : trips}
          isModalVisible={isModalVisible}
          handleModalVisibility={handleModalVisibility}
        />
      </>
    );
  }
}

export default Home;
