import React from "react";
import "./Trip.css";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
 

class Trip extends React.Component {
    hasTripStartedButNotFinished = trip => {
        return (
            trip.car_start_mileage &&
            trip.car_end_mileage &&
            trip.car_start_mileage === trip.car_end_mileage
        );
    };

    isTripFinished = trip => {
        return trip.car_start_mileage < trip.car_end_mileage;
    };

    editModalVisibilityHelper = (bool, trip, type) => {
        this.props.handleEditModalVisibility(bool, trip, type);
    };

    render() {
        const { trip, handleMapModalVisibility } = this.props;
        const {
            img_url,
            driver,
            start_trip,
            end_trip,
            destination,
            plate
        } = trip;
        return (
            <>
                <div>
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
                            <div className="driver-name">{driver}</div>
                            <div className="license-plate"> {plate}</div>
                        </div>
                        <div className="trip-card-start-destination">
                            <div className="starttime">
                                {moment(start_trip).format("H:mm")}
                            </div>
                            <div className="startdestination"> RATO LISBON</div>
                            <div className="startday">
                                {moment(start_trip).format("D MMM YYYY")}
                            </div>
                        </div>
                        <div className="trip-card-arrow">
                            <span className="trip-arrow"> &#x27F7;</span>
                            <br />
                            <div
                                className="viewmaplink"
                                onClick={() =>
                                    handleMapModalVisibility(true, trip)
                                }
                            >
                                VIEW ROUTE >
                            </div>
                        </div>
                        <div className="trip-card-end-destination">
                            <div className="endtime">
                                {" "}
                                {moment(end_trip).format("H:mm")}
                            </div>
                            <div className="enddestination">{destination}</div>
                            <div className="endday">
                                {moment(end_trip).format("D MMM YYYY")}
                            </div>
                        </div>
                        {
                            this.isTripFinished(trip) ?
                            <div className="trip-card-end-trip">
                                <div id="completed-trip-text">
                                    <FontAwesomeIcon 
                                    icon={faCheck}
                                    color={"#73b504"} />  Completed
                                </div>
                            </div>
                            :
                            <>
                            <div className="trip-card-start-trip">
                                <div
                                    className={
                                        this.hasTripStartedButNotFinished(trip) ||
                                        this.isTripFinished(trip)
                                            ? "button hideButton"
                                            : "button"
                                    }
                                    onClick={() =>
                                        this.editModalVisibilityHelper(
                                            true,
                                            trip,
                                            "start"
                                        )
                                    }
                                >
                                    START TRIP
                                </div>
                            </div>
                            <div className="trip-card-end-trip">
                                {" "}
                                <div
                                    className={
                                        this.isTripFinished(trip) ||
                                        !this.hasTripStartedButNotFinished(trip)
                                            ? "button hideButton"
                                            : "button"
                                    }
                                    onClick={() =>
                                        this.editModalVisibilityHelper(
                                            true,
                                            trip,
                                            "end"
                                        )
                                    }
                                >
                                    END TRIP
                                </div>
                            </div>
                            </>
                        }
                    </div>
                </div>
            </>
        );
    }
}
export default Trip;
