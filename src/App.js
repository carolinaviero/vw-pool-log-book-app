import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import moment from "moment";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import Confirmation from "./components/BookTrip/Confirmation";
import TripDetails from "./components/Home/TripDetails";
// import car1 from "./media/car-1.png";
// import car2 from "./media/car-2.png";

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
                    "start_trip": "2020-02-02T12:00:00.000Z",
                    "end_trip": "2020-02-02T14:00:00.000Z",
                    "destination": "Alverca do Ribatejo",
                    "car_start_mileage": 40672,
                    "car_end_mileage": 40677,
                    "car_id": 2,
                    "plate": "PG-08-70",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.23.25_AM_jvl8ub.png"
                },
                {
                    "id": 2,
                    "driver": "Nuno Lima",
                    "start_trip": "2020-02-03T14:00:00.000Z",
                    "end_trip": "2020-02-03T16:00:00.000Z",
                    "destination": "Alameda",
                    "car_start_mileage": 50672,
                    "car_end_mileage": 50677,
                    "car_id": 2,
                    "plate": "PG-09-77",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.24.23_AM_nxoeww.png"
                },
                {
                    "id": 3,
                    "driver": "Carolina Viero",
                    "start_trip": "2020-02-03T18:00:00.000Z",
                    "end_trip": "2020-02-03T20:00:00.000Z",
                    "destination": "Vila Nova de Mil Fontes",
                    "car_start_mileage": 50677,
                    "car_end_mileage": 50682,
                    "car_id": 2,
                    "plate": "PG-09-77",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.24.23_AM_nxoeww.png"
                },
                {
                    "id": 4,
                    "driver": "Angélina Riet",
                    "start_trip": "2020-02-04T12:00:00.000Z",
                    "end_trip": "2020-02-04T14:00:00.000Z",
                    "destination": "Beja",
                    "car_start_mileage": 40677,
                    "car_end_mileage": 40682,
                    "car_id": 1,
                    "plate": "PG-08-70",
                    "img_url": "https://res.cloudinary.com/drm2ot7ge/image/upload/v1580913034/Volkswagen/Captura_de_ecr%C3%A3_2020-02-05_%C3%A0s_10.23.25_AM_jvl8ub.png"
                }
            ],
            availableCars: [],
            filteredTripsByDriver: [],
            filterByDriver: "all",
            sortByDate: "desc"
        };
    }

    componentDidMount() {
        // sort trips arr by date
        // sort((a, b) => moment(b.startDate) - moment(a.startDate))
    }

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

    handleFilterByDriver = (driver) => {
        this.setState({ filterByDriver: driver });
    };

    // Boonking trips
    handleDateSubmit = (date, startTime, endTime) => {
        // turn strings to moment objects
        const selectedDay = moment(date);
        const startTrip = moment(`${date} ${startTime}`);
        const endTrip = moment(`${date} ${endTime}`);
        // console.log("DAY: ", moment("2020-02-04T12:00:00.000Z").format("YYYY-MM-DD"));
        // get all booked hours by car
        const bookedDatesByCar = this.state.trips.reduce((acc, curr) => {
            return {   
                ...acc,
                [curr.car_id]: 
                    [ 
                        ...(acc[curr.car_id] ? acc[curr.car_id] : []), 
                        { start_trip: curr.start_trip, end_trip: curr.end_trip }
                    ]
            }
        }, {});

        // check if selectd date and time overlaps any alerady booked trips
        let carAvailability = {};
        for (const key in bookedDatesByCar) {
            for (let i = 0; i < bookedDatesByCar[key].length; i++) {
                const currentCarStartTrip = moment(bookedDatesByCar[key][i].start_trip);
                const currentCarEndTrip = moment(bookedDatesByCar[key][i].end_trip);
                console.log(currentCarStartTrip.format("YYYY-MM-DD"));
                // check if the selected day matches any already booked days
                if (currentCarStartTrip.format("YYYY-MM-DD") === selectedDay.format("YYYY-MM-DD")) {
                    // check if there are overlapping hours
                    if ((startTrip > currentCarStartTrip && startTrip < currentCarEndTrip) || (endTrip > currentCarStartTrip && endTrip < currentCarEndTrip)) {
                        carAvailability[key] = false;
                    } else {
                        carAvailability[key] = carAvailability.hasOwnProperty(key) && carAvailability[key] === false ? false : true; 
                    }
                // if selected day doesn't match any booked day for current car 
                } else {
                    carAvailability[key] = carAvailability.hasOwnProperty(key) && carAvailability[key] === false ? false : true;
                }
            }
        }
        
        this.setState((prevState) => (
            { 
                ...prevState,
                availableCars: Object.keys(carAvailability)  
            }
        ), () => console.log(this.state.availableCars));
        
        // this.props.history.push("/confirmation");
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
        const { trips, filterByDriver } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Home
                                    trips={trips}
                                    tripsFilteredByDriver={filterByDriver !== "all" ? trips.filter(trip => trip.driver === filterByDriver) : []}
                                    onSortByDate={this.handleSortByDate}
                                    onFilterByDriver={this.handleFilterByDriver}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/booking"
                            render={() => (
                                <BookTrip
                                    handleDateSubmit={this.handleDateSubmit}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/confirmation"
                            render={() => (
                                <Confirmation
                                    handleSubmitBooking={
                                        this.handleSubmitBooking
                                    }
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/details/:tripId"
                            render={(routeParams) => (
                                <TripDetails trip={trips.find(trip => trip.id === +routeParams.match.params.tripId)}/>
                            )}
                        />
                    </Switch>
                </header>
            </div>
        );
    }
}

export default withRouter(App);
