import React from "react";
import { Link } from "react-router-dom";

class Confirmation extends React.Component {

    handleSubmitBookingHelper = (e) => {
        e.preventDefault();
        this.props.handleSubmitBooking();
    }

    render() {
        return (
            <>
                <div>Confirmation Component</div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <form onSubmit={this.handleSubmitBookingHelper}> 
                    <label htmlFor="name">Name: </label> 
                        <input id="name" type="text" />
                    <label htmlFor="where">Destination: </label>
                        <input id="destination" type="text" />
                    <div>Info about time and date will be displayed here</div>
                    <input type="submit" value="Confirm Booking"/>
                    </form>
                </div>
            </>
        );
    }
}

export default Confirmation;
