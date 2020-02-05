import React from "react";
import { Link } from "react-router-dom";

class BookTrip extends React.Component {

    handleDateSubmitHelper = (e) => {
        e.preventDefault();
        this.props.handleDateSubmit();
    }

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
                    <label htmlFor="time">Time: </label>
                        <input id="time" type="time" name="time" />
                    <input type="submit" value="Submit"/>
                    </form>
                </div>
            </>
        );
    }
}

export default BookTrip;
