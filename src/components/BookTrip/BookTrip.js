import React from "react";
import { Link } from "react-router-dom";

class BookTrip extends React.Component {

    handleDateSubmitHelper = (e) => {
        e.preventDefault();
        // const date = e.target.date.value;
        // const startTime = e.target.startTime.value;
        // const endTime = e.target.endTime.value;
        const date = "2020-02-03"
        const startTime = "19:59"
        const endTime = "21:30"
        this.props.handleDateSubmit(date, startTime, endTime);
    };

    handleSubmitBookingHelper = (e) => {
        e.preventDefault();
        this.props.handleSubmitBooking();
    }

    render() {
        return (
            <>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>Book your Trip</div>
                <div>Select a date and time:</div>
                <div>
                    <form onSubmit={this.handleDateSubmitHelper}> 
                        <label htmlFor="date">Date: </label> 
                        <input id="date" type="date" name="date" />
                        
                        <label htmlFor="startTime">Start time: </label>
                        <input id="startTime" type="time" name="startTime" />

                        <label htmlFor="endTime">Estimated end time: </label>
                        <input id="endTime" type="time" name="endTime" />
                        
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <div>
                    Available cars:
                    (available cars for the chosen date and time will be displayed here)
                </div>
                <div>
                    <div>Please confirm your details:</div>
                    <form onSubmit={this.handleSubmitBookingHelper}> 
                    <label htmlFor="name">Name: </label> 
                        <input id="name" type="text" />
                    <label htmlFor="where">Destination: </label>
                        <input id="destination" type="text" />
                    <input type="submit" value="Confirm Booking"/>
                    </form>
                </div>
            </>
        );
    }
}

export default BookTrip;
