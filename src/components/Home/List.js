import React from "react";
import "./List.css";
// import moment from "moment";
import Trip from "./Trip";

class List extends React.Component {
  render() {
    const { trips, handleMapModalVisibility, handleEditModalVisibility } = this.props;
    return (
      <>
        <h2>Booked Trips</h2>
        <div className="listContainer">
          {trips.map(trip => (
            <Trip key={trip.id} 
              trip={trip} 
              handleMapModalVisibility={handleMapModalVisibility} 
              handleEditModalVisibility={handleEditModalVisibility}
              />
          ))}
        </div>
      </>
    );
  }
}

export default List;
