import React from "react";
import { Link } from "react-router-dom";
import "./BookTrip.css";
import { DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

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
    handleSubmitBookingHelper = e => {
        e.preventDefault();
        // const date = "2020-03-05";
        // const startTime = "15:00";
        // const endTime = "19:00";
        const { date, startTime, endTime } = this.state;
        this.props.handleDateSubmit(date, startTime, endTime);
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
        const { availableCars } = this.props;
        console.log(this.state);
        return (
            <>
                <h1>Book your Trip</h1>
                <div className="button">
                    <Link to="/">Home</Link>
                </div>
                <h2>Please confirm your details:</h2>
                <div>
                    <form onSubmit={this.handleSubmitBookingHelper}>
                        <label htmlFor="name">Name: </label>
                        <input onChange={this.handleInputChange} id="name" type="text" name="driver" />
                        <label htmlFor="where">Destination: </label>
                        <input onChange={this.handleInputChange} id="destination" type="text" name="destination" />
                        <label htmlFor="date">Date: </label>
                        <input onChange={this.handleInputChange} id="date" type="date" name="date" />
                        <label htmlFor="startTime">Start time: </label>
                        <input onChange={this.handleInputChange} id="startTime" type="time" name="startTime" />
                        <label htmlFor="endTime">Estimated end time: </label>
                        <input onChange={this.handleInputChange} id="endTime" type="time" name="endTime" />
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
                                <div className="car-container">
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
                                        <div className="button">BOOK</div>
                                    </div>
                                </div>
                            )}
                    </div>
                </Element>
            </>
        );
    }
}

export default BookTrip;
