import React from "react";
import "./List.css";
import moment from "moment";
import Trip from "./Trip";

class List extends React.Component {
    render() {
        const { allTrips } = this.props;
        return (
            <>
                <div>List Component</div>
                <div className="listContainer">
                    {allTrips.map(trip => <Trip key={trip.id} trip={trip} />)}
                </div>
            </>
        );
    }
}

export default List;
