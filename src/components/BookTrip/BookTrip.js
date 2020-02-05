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

    render() {
        return (
            <>
                <div>
                    <Link to="/confirmation">Confirmation</Link>
                </div>
                <div>Book your Trip</div>
                <div>Please select a date and time:</div>
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
            </>
        );
    }
}

export default BookTrip;
