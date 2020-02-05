import React from "react";
import { Link } from "react-router-dom";
import List from "./List";

class Home extends React.Component {
    
    handleFilterByClick = () => {
        console.log("TODO");
    };

    handleSortByDate = () => {
        this.props.onSortByDate();
    }
    
    render() {
        const { trips } = this.props;

        return (
            <>
                <div>Home Component</div>
                
                <div>
                    <Link to="/booking">Booking</Link>
                </div>

                <div onClick={this.handleFilterByClick}>
                    <p>Filter by driver</p>
                </div>
                
                <div onClick={this.handleSortByDate}>
                    <p>Sort by date</p>
                </div>

                <List trips={trips} />
            </>
        );
    }
}

export default Home;
