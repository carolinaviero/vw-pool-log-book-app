import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import moment from "moment";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import TripDetails from "./components/Home/TripDetails";
import MapModal from "./components/Home/MapModal";
import { tripsHelper } from "./helpers/tripsHelper";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [
                {
                    "id": 0,
                    "driver": "Ed Watson",
                    "start_trip": "2020-02-05T12:00:00.000Z",
                    "end_trip": "2020-02-05T18:00:00.000Z",
                    "destination": "Ribamar",
                    "car_start_mileage": 40672,
                    "car_end_mileage": 40677,
                    "car_id": 1,
                    "plate": "PG-08-70",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.23.25_AM_jvl8ub.png"
                },
                {
                    "id": 1,
                    "driver": "Ed Watson",
                    "start_trip": "2020-02-06T12:00:00.000Z",
                    "end_trip": "2020-02-06T18:00:00.000Z",
                    "destination": "Alverca do Ribatejo",
                    "car_start_mileage": 40672,
                    "car_end_mileage": 40677,
                    "car_id": 1,
                    "plate": "PG-08-70",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.23.25_AM_jvl8ub.png"
                },
                {
                    "id": 3,
                    "destination": "Alameda",
                    "start_trip": "2020-02-05T12:00:00.000Z",
                    "end_trip": "2020-02-05T18:00:00.000Z",
                    "car_start_mileage": 50672,
                    "car_end_mileage": 50677,
                    "car_id": 2,
                    "plate": "PG-09-77",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.24.23_AM_nxoeww.png"
                },
                {
                    "id": 4,
                    "destination": "Vila Nova de Mil Fontes",
                    "start_trip": "2020-03-05T12:00:00.000Z",
                    "end_trip": "2020-03-05T15:00:00.000Z",
                    "car_start_mileage": 50677,
                    "car_end_mileage": 50682,
                    "car_id": 2,
                    "plate": "PG-09-77",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.24.23_AM_nxoeww.png"
                },
                
            ],
            cars: [],
            availableCars: [],
            filteredTripsByDriver: [],
            filterByDriver: "all",
            sortByDate: "desc"
        };
    }

    async componentDidMount() {
        const { cars } = await tripsHelper();
        this.setState({ cars });
        // sort trips arr by date
        // sort((a, b) => moment(b.startDate) - moment(a.startDate))
    }

    // Toggle modal visibility
    handleModalVisibility = (bool, trip) => {
        this.setState({
            isModalVisible: bool,
            selectedTrip: trip
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
        const bookedDatesByCar = this.state.trips.reduce((acc, curr) => {
            const newTrip = curr.start_trip > now ? { start_trip: curr.start_trip, end_trip: curr.end_trip } : null;
            return {
                ...acc,
                [curr.car_id]: newTrip ? 
                    [
                        ...(acc[curr.car_id] ? acc[curr.car_id] : []),
                        newTrip
                    ] : [
                        ...(acc[curr.car_id] ? acc[curr.car_id] : []),
                    ]
            };
        }, {});
        console.log("Booked trips by car: ", bookedDatesByCar);
        
        // check if selectd date and time overlaps any alerady booked trips
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
                        if (!unavailableCarIds.includes(Number(key))) unavailableCarIds.push(Number(key));
                    } 
                } 
            }
        }
        console.log("Unavailable car ids: ", unavailableCarIds);

        this.setState(
            prevState => ({
                    ...prevState,
                    availableCars: prevState.cars.filter(car => !unavailableCarIds.includes(car.id))
                }),
                () => console.log("Available cars: ", this.state.availableCars)
            );
    };

    cleanAvailableCars = () => {
        this.setState({ availableCars: [] })
    };

    handleSubmitBooking = () => {
        console.log("booked");
        this.props.history.push("/");
        // this.setState((prevState) => {
        //     return {
        //         ...prevState,
        //         allTrips: [
        //             {
        //                 name:
        //                 startDate:
        //                 endDate:
        //             }
        //         ]
        //     }
        // })
    };

    render() {
        const {
            trips,
            availableCars,
            filterByDriver,
            isModalVisible,
            selectedTrip
        } = this.state;

        // console.log(this.state.cars);

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
                            {isModalVisible && (
                                <MapModal
                                    trip={selectedTrip}
                                    isModalVisible={isModalVisible}
                                    handleModalVisibility={
                                        this.handleModalVisibility
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
                                        isModalVisible={isModalVisible}
                                        handleModalVisibility={
                                            this.handleModalVisibility
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
                                        cleanAvailableCars={this.cleanAvailableCars}
                                    />
                                )}
                            />
                            {/* <Route
                                exact
                                path="/confirmation"
                                render={() => (
                                    <Confirmation
                                        handleSubmitBooking={
                                            this.handleSubmitBooking
                                        }
                                    />
                                )}
                            /> */}
                            <Route
                                exact
                                path="/details/:tripId"
                                render={routeParams => (
                                    <TripDetails
                                        trip={trips.find(
                                            trip =>
                                                trip.id ===
                                                +routeParams.match.params.tripId
                                        )}
                                    />
                                )}
                            />
                        </Switch>
                    </header>
                </div>
            </>
        );
    }
}

export default withRouter(App);
