import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./BookTrip.css";
import { Element, scroller } from "react-scroll";
import moment from "moment";

class BookTrip extends React.Component {
  state = {
    date: "",
    startTime: "",
    endTime: "",
    driver: "",
    destination: "",
    showMessage: false
  };

  componentWillUnmount() {
    this.props.cleanAvailableCars();
    this.props.cleanFilterByDriver();
  }

  handleInputChange = e => {
    this.props.cleanAvailableCars();
    this.setState({ [e.target.name]: e.target.value, showMessage: false });
  };

  renderAvailableCars = e => {
    e.preventDefault();
    const { date, startTime, endTime } = this.state;
    this.props.handleDateSubmit(date, startTime, endTime);
    this.setState({ showMessage: true });
  };

  handleBooking = (car_id, img_url, plate) => {
    const { date, startTime, endTime, driver, destination } = this.state;
    const start_trip = moment(`${date} ${startTime}`).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const end_trip = moment(`${date} ${endTime}`).format("YYYY-MM-DD HH:mm:ss");
    const id = Math.random() * 100;
    const newBooking = {
      driver,
      start_trip,
      end_trip,
      destination,
      car_start_mileage: 0,
      car_end_mileage: 0,
      car_id,
      plate,
      img_url,
      id
    };
    this.props.onBooking(newBooking);
    this.props.history.push("/bookingsuccess");
  };

  scrollTo = () => {
    scroller.scrollTo("scroll-to-element", {
      duration: 1000,
      delay: 0,
      smooth: "easeOutQuad"
    });
  };

  render() {
    const {
      date,
      startTime,
      endTime,
      driver,
      destination,
      showMessage
    } = this.state;
    const { availableCars } = this.props;

    return (
      <>
        <h1>Book your Trip</h1>
        <div className="button">
          <Link to="/">Home</Link>
        </div>
        <h2>Please confirm your details:</h2>
        <div>
          <form onSubmit={this.renderAvailableCars}>
            <label htmlFor="name">Name: </label>
            <input
              onChange={this.handleInputChange}
              id="name"
              type="text"
              name="driver"
              value={driver}
            />
            <label htmlFor="where">Destination: </label>
            <input
              onChange={this.handleInputChange}
              id="where"
              type="text"
              name="destination"
              value={destination}
            />
            <label htmlFor="date">Date: </label>
            <input
              onChange={this.handleInputChange}
              id="date"
              type="date"
              name="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
            />
            <label htmlFor="startTime">Start time: </label>
            <input
              onChange={this.handleInputChange}
              id="startTime"
              type="time"
              // no lesser than de current moment
              min={date === moment().format("YYYY-MM-DD") ? moment().format("HH:mm") : null}
              name="startTime"
              value={startTime}
            />
            <label htmlFor="endTime">Estimated end time: </label>
            <input
              onChange={this.handleInputChange}
              id="endTime"
              type="time"
              // no lesser than start trip moment plus 15min
              min={moment(`${date} ${startTime}:00`).add(15, "m").format("HH:mm")}
              name="endTime"
              value={endTime}
            />
            <div className="submit-button-div">
              <input
                type="submit"
                value="CHECK AVAILABILITY"
                className="submit-button"
                onClick={() => this.scrollTo()}
              />
            </div>
          </form>
        </div>

        <Element name="scroll-to-element" className="element">
          {availableCars.length > 1 ? (
            <div className="available-cars-text">
              <h2>{availableCars.length} available cars for selected date:</h2>
            </div>
          ) : (
            <div className="available-cars-text">
              <h2>
                {availableCars.length === 1
                  ? `${availableCars.length} available car for selected date:`
                  : showMessage
                  ? "Unfortunately, there are no cars available during this period, please try again."
                  : null}
              </h2>
            </div>
          )}
          <div className="parent-car-container">
            {availableCars.map(car => (
              <div key={car.id} className="car-container">
                <div className="book-card-car-image">
                  {" "}
                  <img
                    className="bookCarImage"
                    src={car.img_url_alternative}
                    alt={car.model}
                  />
                </div>
                <p className="make">{car.make}</p>
                <h2>{car.model}</h2>
                <p className="license-plate">{car.plate}</p>
                <div className="book-button">
                  <div
                    className="button"
                    onClick={() =>
                      this.handleBooking(car.id, car.img_url, car.plate)
                    }
                  >
                    BOOK
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Element>
      </>
    );
  }
}

export default withRouter(BookTrip);
