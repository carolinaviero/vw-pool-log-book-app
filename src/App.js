import React from "react";
import "./App.css";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import moment from "moment";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import MapModal from "./components/Home/MapModal";
import StartModal from "./components/Home/StartModal";
import Success from "./components/SuccessSignposting/Success";
import TripMetrics from "./components/Home/TripMetrics";
import {
    tripsHelperFn,
    startTripHelperFn,
    bookingHelperFn,
    metricsHelperFn
} from "./helpers/tripsHelper";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            cars: [],
            trip: {},
            availableCars: [],
            filterByDriver: "all",
            sortByDate: "desc",
            isMapModalVisible: false,
            isStartModalVisible: false,
            selectedTrip: {},
            typeOfModal: "",
            filterByCar: "PG-08-70",
            carMetrics: [],
            driverMetrics: [],
        };
    }

    async componentDidMount() {
        scroll.scrollToTop();
        const { trips, cars } = await tripsHelperFn();
        const { driverMetrics, carMetrics } = await metricsHelperFn();
        this.setState({ trips, cars, carMetrics, driverMetrics });
    }

    // Handle modals visibility
    handleMapModalVisibility = (bool, trip) => {
        this.setState({
            isMapModalVisible: bool,
            selectedTrip: trip
        });
    };

    handleEditModalVisibility = (bool, trip, type) => {
        this.setState({
            isStartModalVisible: bool,
            selectedTrip: trip,
            typeOfModal: type
        });
    };

    // Sorting and filtering
    handleSortByDate = () => {
        this.setState(prevState => {
            return this.state.sortByDate === "desc"
                ? {
                      ...prevState.trips.sort(
                          (a, b) => moment(a.start_trip) - moment(b.start_trip)
                      ),
                      sortByDate: "asc"
                  }
                : {
                      ...prevState.trips.sort(
                          (a, b) => moment(b.start_trip) - moment(a.start_trip)
                      ),
                      sortByDate: "desc"
                  };
        });
    };

    handleFilterByDriver = driver => {
        this.setState({ filterByDriver: driver });
    };

    handleFilterByCar = carPlate => {
        this.setState({ filterByCar: carPlate });
    };

    // Boonking trips
    handleDateSubmit = (date, startTime, endTime) => {
        // format date strings
        const startTrip = moment(`${date} ${startTime}`).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        const endTrip = moment(`${date} ${endTime}`).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        const now = moment().format("YYYY-MM-DD HH:mm:ss");

        // TODO: alienate to helper file
        // get all booked hours by car that are in the future
        const bookedDatesByCar = this.state.trips.reduce((acc, curr) => {
            const newTrip =
                curr.end_trip > now
                    ? { start_trip: curr.start_trip, end_trip: curr.end_trip }
                    : null;
            return {
                ...acc,
                [curr.car_id]: newTrip
                    ? [...(acc[curr.car_id] ? acc[curr.car_id] : []), newTrip]
                    : [...(acc[curr.car_id] ? acc[curr.car_id] : [])]
            };
        }, {});

        // TODO alienate to helper file
        let unavailableCarIds = [];
        // check if bookedDatesByCar is not an empty obj (which will happen with an empty DB) and is not composed of empty arrays (no future trips booked)
        if (
            Object.keys(bookedDatesByCar).length > 0 &&
            Object.values(bookedDatesByCar).some(date => date.length > 0)
        ) {
            for (const key in bookedDatesByCar) {
                for (let i = 0; i < bookedDatesByCar[key].length; i++) {
                    const currentCarStartTrip = moment(
                        bookedDatesByCar[key][i].start_trip
                    ).format("YYYY-MM-DD HH:mm:ss");
                    const currentCarEndTrip = moment(
                        bookedDatesByCar[key][i].end_trip
                    ).format("YYYY-MM-DD HH:mm:ss");
                    // check if there are overlapping hours
                    if (
                        (startTrip > currentCarStartTrip &&
                            startTrip < currentCarEndTrip) ||
                        (endTrip > currentCarStartTrip &&
                            endTrip < currentCarEndTrip) ||
                        (startTrip < currentCarStartTrip &&
                            endTrip > currentCarEndTrip) ||
                        (startTrip === currentCarStartTrip &&
                            endTrip === currentCarEndTrip)
                    ) {
                        // push car_id to unavailableCarIds arr if it's not already there
                        if (!unavailableCarIds.includes(Number(key)))
                            unavailableCarIds.push(Number(key));
                    }

                    this.setState(prevState => ({
                        ...prevState,
                        availableCars: prevState.cars.filter(
                            car => !unavailableCarIds.includes(car.id)
                        )
                    }));
                }
            }
        } else {
            this.setState(prevState => ({
                ...prevState,
                availableCars: prevState.cars
            }));
        }
    };

    handleOnBooking = trip => {
        // save trip in DB
        bookingHelperFn(trip);
        // optimistically update the state
        this.setState(prevState => ({
            ...prevState,
            filterByDriver: "all",
            trip,
            trips: [trip, ...prevState.trips]
        }));
    };

    cleanAvailableCars = () => {
        this.setState({ availableCars: [] });
    };

    // Start and end trips
    editTripHandler = (trip, mileage, type) => {
        // trip with mileage
        const updatedTrip =
            type === "start"
                ? {
                      ...trip,
                      start_trip: moment().format("YYYY-MM-DD HH:mm:ss"),
                      car_start_mileage: mileage,
                      car_end_mileage: mileage
                  }
                : {
                      ...trip,
                      end_trip: moment().format("YYYY-MM-DD HH:mm:ss"),
                      car_end_mileage: mileage
                  };
        // update the DB
        startTripHelperFn(updatedTrip);
        // update the state with a new trips
        this.setState(prevState => {
            const updatedTrips = prevState.trips.map(trip => {
                if (trip.id === updatedTrip.id) {
                    return updatedTrip;
                }
                return trip;
            });
            return {
                ...prevState,
                trips: updatedTrips,
                isStartModalVisible: false,
                selectedTrip: {}
            };
        });
    };

    // Get last trip mileage by car
    lastTripEndMileage = () => {
        const { trips, selectedTrip } = this.state;
        // get the trips that have finished and were done with the car from current trip, sort by date desc and get the first el
        const lastTrip = trips.filter(trip => trip.car_id === selectedTrip.car_id && trip.car_start_mileage < trip.car_end_mileage)
            .sort((a, b) => moment(b.end_trip) - moment(a.end_trip))[0]
        return lastTrip.car_end_mileage;
    }

    render() {
        const {
            trips,
            availableCars,
            trip,
            filterByDriver,
            isMapModalVisible,
            isStartModalVisible,
            typeOfModal,
            selectedTrip,
            sortByDate,
            filterByCar, 
            carMetrics
        } = this.state;

        return (
            <>
                <nav>
                    <Link to="/">
                        <img
                            className="vwds-logo"
                            src="images/logo_vwds_header@2x.png"
                            alt="VW Digital Solutions logo"
                            width="225"
                            height="36"></img>
                    </Link>
                    <Link to="/">
                        <img
                            className="vwds-logo-mobile"
                            src="images/logo-mobile.png"
                            alt="VW Digital Solutions logo"
                            width="36"
                            height="36"></img>
                    </Link>
                </nav>

                <div className="App">
                    <header className="App-header">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Home
                                        trips={trips}
                                        tripsFilteredByDriver={
                                            filterByDriver !== "all"
                                                ? trips.filter(
                                                      trip =>
                                                          trip.driver ===
                                                          filterByDriver
                                                  )
                                                : []
                                        }
                                        sortByDate={sortByDate}
                                        onSortByDate={this.handleSortByDate}
                                        onFilterByDriver={
                                            this.handleFilterByDriver
                                        }
                                        isMapModalVisible={isMapModalVisible}
                                        handleMapModalVisibility={
                                            this.handleMapModalVisibility
                                        }
                                        handleEditModalVisibility={
                                            this.handleEditModalVisibility
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/booking"
                                render={() => (
                                    <BookTrip
                                        handleDateSubmit={this.handleDateSubmit}
                                        availableCars={availableCars}
                                        cleanAvailableCars={
                                            this.cleanAvailableCars
                                        }
                                        onBooking={this.handleOnBooking}
                                    />
                                )}
                            />

                            <Route
                                exact
                                path="/metrics"
                                render={() => (
                                    <TripMetrics
                                        filterByCar={filterByCar}
                                        handleFilterByCar={this.handleFilterByCar}
                                        carMetrics={carMetrics}
                                    />
                                )}
                            />

                            <Route
                                exact
                                path="/bookingsuccess"
                                render={() => (
                                    <Success
                                        header={"You've booked a car!"}
                                        subheader={"We've got you covered."}
                                        paragraph={`Once you get in the car, find your trip in Current Trips, and just tap START TRIP. Enter the start mileage from the car's dial, then you're ready to drive!`}
                                        buttontext={"OK"}
                                        buttonlinkdestination={"/"}
                                        trip={trip}
                                    />
                                )}
                            />
                        </Switch>
                    </header>

                    <footer>
                        CREATED AT THE WILD CODE SCHOOL LISBON HACKATHON FOR
                        VWDS, © 2020.
                    </footer>

                    {isStartModalVisible && (
                        <StartModal
                            lastKnownMileage={this.lastTripEndMileage()}
                            type={typeOfModal}
                            trip={selectedTrip}
                            isModalVisible={isStartModalVisible}
                            handleModalVisibility={
                                this.handleEditModalVisibility
                            }
                            onEditTripSubmit={this.editTripHandler}
                        />
                    )}

                    {isMapModalVisible && (
                        <MapModal
                            trip={selectedTrip}
                            isModalVisible={isMapModalVisible}
                            handleModalVisibility={
                                this.handleMapModalVisibility
                            }
                        />
                    )}
                </div>
            </>
        );
    }
}

export default withRouter(App);
