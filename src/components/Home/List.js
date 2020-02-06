import React from "react";
import "./List.css";
// import moment from "moment";
import Trip from "./Trip";

class List extends React.Component {
  render() {
    const { trips, handleModalVisibility } = this.props;
    return (
      <>
        <p>
          <em>Sorted by date</em>
        </p>
        <div className="listContainer">
          {trips.map(trip => (
            <Trip
              key={trip.id}
              trip={trip}
              handleModalVisibility={handleModalVisibility}
            />
          ))}
        </div>
      </>
    );
  }
}

export default List;
