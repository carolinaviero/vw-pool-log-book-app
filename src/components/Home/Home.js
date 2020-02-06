import React from "react";
import { Link } from "react-router-dom";
import List from "./List";

class Home extends React.Component {
    
    handleFilterByDriver = (e) => {
        this.props.onFilterByDriver(e.target.value)
    };

    handleSortByDate = () => {
        this.props.onSortByDate();
    };
    
    render() {
        const { trips, tripsFilteredByDriver, isModalVisible, handleModalVisibility } = this.props;

        return (
            <>
                <div>Home Component</div>
                
                <div>
                    <Link to="/booking">Booking</Link>
                </div>

                <label htmlFor="driverSelect">Filter by driver: </label>
                <select id="driverSelect" onChange={this.handleFilterByDriver}>
                    <option defaultValue>All</option>
                    {trips
                        // get all unique drivers in trips and render their names in the select
                        .reduce((acc, curr) => [...acc, acc.includes(curr.driver) ? null : curr.driver], [])
                        .sort()
                        .map(driver => driver && <option key={driver} value={driver}>{driver}</option>)}
                </select>
                
                <div onClick={this.handleSortByDate}>
                    <p>Sort by date</p>
                </div>

                <List trips={tripsFilteredByDriver.length ? tripsFilteredByDriver : trips} 
                    isModalVisible={isModalVisible} 
                    handleModalVisibility={handleModalVisibility} />
            </>
        );
    }
}

export default Home;
