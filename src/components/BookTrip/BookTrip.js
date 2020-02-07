import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./BookTrip.css";
import { Element, animateScroll as scroll, scroller } from 'react-scroll'
import moment from "moment";

class BookTrip extends React.Component {
    state = {
        date: "2020-03-05",
        startTime: "15:00",
        endTime: "19:00",
        driver: "Nuno",
        destination: "Porto",
    };

    componentWillUnmount() {
        this.props.cleanAvailableCars();
    }
    
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    renderAvailableCars = e => {
        e.preventDefault();
        const { date, startTime, endTime } = this.state;
        this.props.handleDateSubmit(date, startTime, endTime);
    };

    handleBooking = (car_id, img_url, plate) => {
        const { date, startTime, endTime, driver, destination } = this.state;
        const start_trip = moment(`${date} ${startTime}`).format("YYYY-MM-DD HH:mm:ss");
        const end_trip = moment(`${date} ${endTime}`).format("YYYY-MM-DD HH:mm:ss");
        const id = Math.random() * 100;
        const newBooking = { driver,  start_trip, end_trip, destination, car_start_mileage: 0, car_end_mileage: 0, car_id, plate, img_url, id };
        this.props.onBooking(newBooking);
        this.props.history.push("/");
    };

    scrollToTop = () => scroll.scrollToTop();

    scrollTo = () => {
        scroller.scrollTo('scroll-to-element', {
            duration: 1000,
            delay: 0,
            smooth: 'easeOutQuad'
        })
    }
    
    render() {
        const { date, startTime, endTime, driver, destination } = this.state;
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
                        <input onChange={this.handleInputChange} id="name" type="text" name="driver" value={driver}/>
                        <label htmlFor="where">Destination: </label>
                        <input onChange={this.handleInputChange} id="where" type="text" name="destination" value={destination}/>
                        <label htmlFor="date">Date: </label>
                        <input onChange={this.handleInputChange} id="date" type="date" name="date" value={date}/>
                        <label htmlFor="startTime">Start time: </label>
                        <input onChange={this.handleInputChange} id="startTime" type="time" name="startTime" value={startTime}/>
                        <label htmlFor="endTime">Estimated end time: </label>
                        <input onChange={this.handleInputChange} id="endTime" type="time" name="endTime" value={endTime} />
                        <div className="submit-button-div">
                            <input type="submit" value="SUBMIT" className="submit-button" onClick={() => this.scrollTo()}/>
                        </div>
                    </form>
                </div>

                <Element name="scroll-to-element" className="element">
                    {
                        availableCars.length ?  
                        <div className="available-cars-text">
                            <h2>{availableCars.length} available cars for selected dates:</h2> 
                        </div>
                        : 
                        null
                    }
                    <div className="parent-car-container">
                        {
                            availableCars.map(car => 
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
                                        <div className="button" onClick={() => this.handleBooking(car.id, car.img_url, car.plate)}>BOOK</div>
                                    </div>
                                </div>
                            )}
                    </div>
                </Element>
            </>
        );
    }
}

export default withRouter(BookTrip);
