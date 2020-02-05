import React from "react";
import { Link } from "react-router-dom";

class BookTrip extends React.Component {
    render() {
        return (
            <>
                <div>BookTrip Component</div>
                <div>
                    <Link to="/confirmation">Confirmation</Link>
                </div>
            </>
        );
    }
}

export default BookTrip;
