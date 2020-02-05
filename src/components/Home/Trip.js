import React from "react";
import "./Trip.css";
import moment from "moment";
import { Link } from "react-router-dom";

class Trip extends React.Component {
    render() {
        const { trip } = this.props;
        return (
            <div className="tripContainer">
                {/* <div class="tripCarImage" style={{ backgroundImage: `url(${trip.image})` }}></div> */}
                <img className="tripCarImage" src={trip.img_url} alt=""/>
                
                <div className="tripSeeMore">
                    <Link to="">see more...</Link>
                </div>

                <div className="tripTextContainer">
                    <label htmlFor="driver">Driver:&nbsp;</label>
                    <span><p id="driver">{trip.name}</p></span>
                </div>

                <div className="tripTextContainer">
                    <label htmlFor="start">Start:&nbsp;</label>
                    <p id="start">{moment(trip.start_trip).format("D of MMM, H:mm")}</p>
                </div>                

                <div className="tripTextContainer">
                    <label htmlFor="end">End:&nbsp;</label>
                    <p id="end">{moment(trip.end_trip).format("D of MMM, H:mm")}</p>
                </div>

                <div className="tripTextContainer">
                    <label htmlFor="route">Route:&nbsp;</label>
                    <p id="route">Rato Lisbon - {trip.destination}</p>
                </div>                
            </div>
        );
    }
}

export default Trip;
