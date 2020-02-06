import React from "react";
import { Link } from "react-router-dom";

class BookTrip extends React.Component {
    componentWillUnmount() {
        this.props.cleanAvailableCars();
    }
    
    handleSubmitBookingHelper = e => {
        e.preventDefault();
        // const date = e.target.date.value;
        // const startTime = e.target.startTime.value;
        // const endTime = e.target.endTime.value;
        const date = "2020-03-05";
        const startTime = "15:00";
        const endTime = "19:00";
        this.props.handleDateSubmit(date, startTime, endTime);
    };

    render() {
        const { availableCars } = this.props;

        return (
            <>
                <h1>Book your Trip</h1>
                <div className="button">
                    <Link to="/">Home</Link>
                </div>
                <h2>Select a date and time:</h2>
                <div>
                    <form onSubmit={this.handleDateSubmitHelper}>
                        <label htmlFor="date">Date: </label>
                        <input id="date" type="date" name="date" />

                        <label htmlFor="startTime">Start time: </label>
                        <input id="startTime" type="time" name="startTime" />

                        <label htmlFor="endTime">Estimated end time: </label>
                        <input id="endTime" type="time" name="endTime" />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div>
                    Available cars: (available cars for the chosen date and time
                    will be displayed here)
                </div>
                <div>
                    <div>Please confirm your details:</div>
                    <form onSubmit={this.handleSubmitBookingHelper}>
                        <label htmlFor="name">Name: </label>
                        <input id="name" type="text" />
                        <label htmlFor="where">Destination: </label>
                        <input id="destination" type="text" />

                        <input type="submit" value="Confirm Booking" />
                    </form>
                </div>

                {availableCars && availableCars.map(car => <h1>{car.plate} is available</h1>)}
            </>
        );
    }
}

export default BookTrip;
