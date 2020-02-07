import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Success.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// this should also include trip info, take from state. button on the end should lead to home

class Success extends React.Component {
  render() {
    console.log(this.props.trip);

    if (!this.props.trip)
      return (
        <>
          <h1> Sorry, you made a wrong turn!</h1>
          <Link to="/">>Back to Home</Link>
        </>
      );
    return (
      <>
        <div className="success-container">
          <FontAwesomeIcon icon={faCheck} color={"#73b504"}></FontAwesomeIcon>
          <h1>{this.props.header}</h1>
          <h2>
            {this.props.trip.driver}, you're taking {this.props.trip.plate} on{" "}
            {moment(this.props.start_trip).format("D MMM YYYY")} at{" "}
            {moment(this.props.start_trip).format("H:mm")}
          </h2>
          <div className="p-success-container">
            <p>{this.props.paragraph}</p>
          </div>
          <div className="button">
            <Link to={this.props.buttonlinkdestination}>
              {this.props.buttontext}
            </Link>
          </div>
          <div className="spacer"></div>
        </div>
      </>
    );
  }
}
export default Success;
