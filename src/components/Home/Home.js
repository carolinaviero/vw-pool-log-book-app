import React from "react";
import { Link } from "react-router-dom";
import List from "./List";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
    handleFilterByDriver = e => {
        this.props.onFilterByDriver(e.target.value);
    };

    handleSortByDate = () => {
        this.props.onSortByDate();
    };

    render() {
        const {
            trips,
            tripsFilteredByDriver,
            isModalVisible,
            handleMapModalVisibility,
            handleEditModalVisibility,
            sortByDate
        } = this.props;

        return (
            <>
                <h1>VWDS Car Pool</h1>
                <div className="button">
                    <Link to="/booking">BOOK A TRIP</Link>
                </div>

                <br />
                <h2>Current Trips</h2>

                <div>
                    <label className="driver-select" htmlFor="driverSelect">
                        Filter by driver:{" "}
                    </label>

                    <select
                        id="driverSelect"
                        onChange={this.handleFilterByDriver}
                    >
                        <option defaultValue>All</option>
                        {trips
                            // get all unique drivers in trips and render their names in the select
                            .reduce(
                                (acc, curr) => [
                                    ...acc,
                                    acc.includes(curr.driver)
                                        ? null
                                        : curr.driver
                                ],
                                []
                            )
                            .sort()
                            .map(
                                driver =>
                                    driver && (
                                        <option key={driver} value={driver}>
                                            {driver}
                                        </option>
                                    )
                            )}
                    </select>
                    <div id="sort-by-date-filter" onClick={this.handleSortByDate}>
                        Sort by date &nbsp;

                        {
                            sortByDate === 'desc' ?
                            <div className="font-awesome-icons-div">
                                <div className="light-arrow">
                                    ▲
                                </div>
                                <div className="bold-arrow">
                                    ▼
                                </div>
                             </div>
                            :
                             <div className="font-awesome-icons-div">
                             <div className="bold-arrow">
                                 ▲
                             </div>
                             <div className="light-arrow">
                                 ▼
                             </div>
                          </div>
                        }
                    </div>
                </div>
                <List
                    trips={
                        tripsFilteredByDriver.length
                            ? tripsFilteredByDriver
                            : trips
                    }
                    isModalVisible={isModalVisible}
                    handleMapModalVisibility={handleMapModalVisibility}
                    handleEditModalVisibility={handleEditModalVisibility}
                />
            </>
        );
    }
}

export default Home;
