import React from "react";
import "./Trip.css";
import moment from "moment";
// import { Link } from "react-router-dom";
import MapModal from "./MapModal";

class Trip extends React.Component {
  render() {
    const { trip, handleModalVisibility } = this.props;
    const { id, img_url, driver, start_trip, end_trip, destination } = trip;

    return (
      <>
        {/* <Link to={`/details/${id}`}> */}
        <div onClick={() => handleModalVisibility(true, trip)}>
          <div className="trip-card-parent">
            <div className="trip-card-car-image">
              {" "}
              <img
                className="tripCarImage"
                src={img_url}
                alt="car-volkswagon"
              />
            </div>
            <div className="trip-card-driver-and-license">
              <div class="driver-name">{driver}</div>

              <div class="license-plate"> PG-08-70</div>
            </div>
            <div className="trip-card-start-destination">
              <div className="starttime">
                {moment(start_trip).format("H:mm")}
              </div>

              <div className="startdestination"> RATO LISBON</div>
              <div className="startday">
                {moment(start_trip).format("D of MMM, YYYY")}
              </div>
            </div>
            <div class="trip-card-arrow">
              <span class="trip-arrow"> &#x27F7;</span>
            </div>
            <div class="trip-card-end-destination">
              <div className="endtime"> {moment(end_trip).format("H:mm")}</div>
              <div className="enddestination">{destination}</div>
              <div className="endday">
                {moment(end_trip).format("D of MMM, YYYY")}
              </div>
            </div>
            <div class="trip-card-start-trip">
              <div class="button">START TRIP</div>
            </div>
            <div class="trip-card-end-trip">
              {" "}
              <div class="button">END TRIP</div>
            </div>
          </div>
        </div>
        {/* </Link> */}
      </>
    );
  }
}

export default Trip;
