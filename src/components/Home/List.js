import React from "react";
import "./List.css";
import Trip from "./Trip";

class List extends React.Component {
  render() {
    const { trips, handleMapModalVisibility, handleEditModalVisibility } = this.props;
    return (
      <>
        {/* <p>
          <em>Sorted by date</em>
        </p> */}
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
