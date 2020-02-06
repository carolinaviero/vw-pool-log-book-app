import React from "react";
import "./List.css";
// import moment from "moment";
import Trip from "./Trip";

class List extends React.Component {
    render() {
        const { trips, isModalVisible, handleModalVisibility } = this.props;

        return (
            <>
                <div>List Component</div>
                <div className="listContainer">
                    {trips.map(trip => (
                        <Trip
                            key={trip.id}
                            trip={trip}
                            isModalVisible={isModalVisible}
                            handleModalVisibility={handleModalVisibility}
                        />
                    ))}
                </div>
            </>
        );
    }
}

export default List;
