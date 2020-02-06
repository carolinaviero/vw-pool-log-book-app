import React from "react";
import "./TripDetails.css";

class TripDetails extends React.Component {
    render() {
        return (
            <>
                <p>details {this.props.trip.driver}</p>
                <iframe title={"map"} width="100%" height="450" frameBorder="0" style={{ border: 0 }} src={`https://www.google.com/maps/embed/v1/directions?origin=rato&waypoints=${this.props.trip.destination}&destination=rato&key=${process.env.REACT_APP_MAPS_KEY}`} allowFullScreen></iframe>
            </>
        );
    }
}

export default TripDetails;
