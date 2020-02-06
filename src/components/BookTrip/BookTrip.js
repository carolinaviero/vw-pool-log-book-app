import React from "react";
import { Link } from "react-router-dom";

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
                    <form onSubmit={this.handleSubmitBookingHelper}>
                        <label htmlFor="date">Date: </label>
                        <input onChange={this.handleInputChange} id="date" type="date" name="date" />

                        <label htmlFor="startTime">Start time: </label>
                        <input onChange={this.handleInputChange} id="startTime" type="time" name="startTime" />

                        <label htmlFor="endTime">Estimated end time: </label>
                        <input onChange={this.handleInputChange} id="endTime" type="time" name="endTime" />

                        <label htmlFor="name">Name: </label>
                        <input onChange={this.handleInputChange} id="name" type="text" name="driver" />
                        
                        <label htmlFor="where">Destination: </label>
                        <input onChange={this.handleInputChange} id="where" type="text" name="destination" />

                        <input type="submit" value="Submit" />
                    </form>
                </div>

                {availableCars && availableCars.map(car => <h1>{car.plate} is available</h1>)}
            </>
        );
    }
}

export default BookTrip;
