import React from "react";
import { Link } from "react-router-dom";

class Confirmation extends React.Component {
    render() {
        return (
            <>
                <div>Confirmation Component</div>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </>
        );
    }
}

export default Confirmation;
