import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import moment from "moment";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import MapModal from "./components/Home/MapModal";
import StartModal from "./components/Home/StartModal";
import { tripsHelperFn, startTripHelperFn, bookingHelperFn } from "./helpers/tripsHelper";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            cars: [],
            availableCars: [],
            filterByDriver: "all",
            sortByDate: "desc",
            isMapModalVisible: false,
            isStartModalVisible: false,
            selectedTrip: {},
            typeOfModal: ""
        };
    }

    async componentDidMount() {
        const { trips, cars } = await tripsHelperFn();
        this.setState({ trips, cars });
    }

    componentDidUpdate() {
        scroll.scrollToTop();
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

    // Boonking trips
    handleDateSubmit = (date, startTime, endTime) => {
        // turn strings to moment objects
        const selectedDay = moment(date);
        const startTrip = moment(`${date} ${startTime}`);
        const endTrip = moment(`${date} ${endTime}`);

        // get all booked hours by car that are in the future
        const now = moment().format();
        // TODO: alienate to helper file
        const bookedDatesByCar = this.state.trips.reduce((acc, curr) => {
            const newTrip =
                curr.start_trip > now
                    ? { start_trip: curr.start_trip, end_trip: curr.end_trip }
                    : null;
            return {
                ...acc,
                [curr.car_id]: newTrip
                    ? [...(acc[curr.car_id] ? acc[curr.car_id] : []), newTrip]
                    : [...(acc[curr.car_id] ? acc[curr.car_id] : [])]
            };
        }, {});
        // console.log("Booked trips by car: ", bookedDatesByCar);

        // check if selectd date and time overlaps any alerady booked trips
        // TODO alienate to helper file
        let unavailableCarIds = [];
        for (const key in bookedDatesByCar) {
            for (let i = 0; i < bookedDatesByCar[key].length; i++) {
                const currentCarStartTrip = moment(
                    bookedDatesByCar[key][i].start_trip
                );
                const currentCarEndTrip = moment(
                    bookedDatesByCar[key][i].end_trip
                );
                // check if the selected day matches any already booked days
                if (
                    currentCarStartTrip.format("YYYY-MM-DD") ===
                    selectedDay.format("YYYY-MM-DD")
                ) {
                    // check if there are overlapping hours
                    if (
                        (startTrip > currentCarStartTrip &&
                            startTrip < currentCarEndTrip) ||
                        (endTrip > currentCarStartTrip &&
                            endTrip < currentCarEndTrip) ||
                        (startTrip < currentCarStartTrip &&
                            endTrip > currentCarEndTrip)
                    ) {
                        // push car_id to unavailableCarIds arr if it's not already there
                        if (!unavailableCarIds.includes(Number(key)))
                            unavailableCarIds.push(Number(key));
                    }
                }
            }
        }
        // console.log("Unavailable car ids: ", unavailableCarIds);

        this.setState(
            prevState => ({
                ...prevState,
                availableCars: prevState.cars.filter(
                    car => !unavailableCarIds.includes(car.id)
                )
            })
        );
    };

    handleOnBooking = (trip) => {
        bookingHelperFn(trip);
        this.setState(prevState => (
            {
                ...prevState,
                trips: [trip, ...prevState.trips],
            }
        ));
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

    render() {
        const {
            trips,
            availableCars,
            filterByDriver,
            isMapModalVisible,
            isStartModalVisible,
            typeOfModal,
            selectedTrip
        } = this.state;

        return (
            <>
                <nav>
                    <img
                        className="vwds-logo"
                        src="images/logo_vwds_header@2x.png"
                        alt="VW Digital Solutions logo"
                        width="225"
                        height="36"
                    ></img>
                </nav>

                <div className="App">
                    <header className="App-header">
                        <Switch>
                            {isStartModalVisible && (
                                <StartModal
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
                        </Switch>
                    </header>
                    <footer>
                        CREATED AT THE WILD CODE SCHOOL LISBON HACKATHON FOR
                        VWDS, © 2020.
                    </footer>
                </div>
            </>
        );
    }
}

export default withRouter(App);
