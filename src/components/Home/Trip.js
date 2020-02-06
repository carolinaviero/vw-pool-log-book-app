import React from "react";
import "./Trip.css";
import moment from "moment";
import { Link } from "react-router-dom";

class Trip extends React.Component {
  render() {
    const {
      id,
      img_url,
      driver,
      start_trip,
      end_trip,
      destination
    } = this.props.trip;

    return (
      <div className="tripContainer">
        {/* <div class="tripCarImage" style={{ backgroundImage: `url(${trip.image})` }}></div> */}
        <img className="tripCarImage" src={img_url} alt="" />

        <div className="tripSeeMore">
          <Link to={`/details/${id}`}>see more...</Link>
        </div>

        <div className="tripTextContainer">
          <label htmlFor="driver">Driver:&nbsp;</label>
          <span>
            <p id="driver">{driver}</p>
          </span>
        </div>

        <div className="tripTextContainer">
          <label htmlFor="start">Start:&nbsp;</label>
          <p id="start">{moment(start_trip).format("D of MMM, H:mm")}</p>
        </div>

        <div className="tripTextContainer">
          <label htmlFor="end">End:&nbsp;</label>
          <p id="end">{moment(end_trip).format("D of MMM, H:mm")}</p>
        </div>

        <div className="tripTextContainer">
          <label htmlFor="route">Route:&nbsp;</label>
          <p id="route">Rato Lisbon - {destination}</p>
        </div>
      </div>
    );
  }
}

export default Trip;
