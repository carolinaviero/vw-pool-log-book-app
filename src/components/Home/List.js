import React from "react";
import "./List.css";
import Trip from "./Trip";

// EW: This works on logic found here https://codepen.io/nunosoares/pen/OeRvXv

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrips: this.props.trips,
      currentPage: 1,
      tripsPerPage: 12
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.trips.length <= state.tripsPerPage) {
      return {
        currentPage: 1
      };
    }
    return null;
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    // Logic for displaying current todos
    const indexOfLastTrip = this.state.currentPage * this.state.tripsPerPage;

    const indexOfFirstTrip = indexOfLastTrip - this.state.tripsPerPage;

    const currentTrips = this.props.trips.slice(
      indexOfFirstTrip,
      indexOfLastTrip
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.trips.length / this.state.tripsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className={number === this.state.currentPage ? "active" : ""}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <>
        <div id="reservations-query-text-div">
          <p>
            <em>
              {this.props.trips.length > 1
                ? `${this.props.trips.length} reservations matching your query`
                : `There is only one reservation matching your query.`}
            </em>
          </p>
        </div>
        <div className="listContainer">
          {currentTrips.map(trip => (
            <Trip
              key={trip.id}
              trip={trip}
              handleMapModalVisibility={this.props.handleMapModalVisibility}
              handleEditModalVisibility={this.props.handleEditModalVisibility}
            />
          ))}
        </div>
        <div className="pageNumbers">
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
      </>
    );
  }
}

export default List;
