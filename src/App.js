import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import moment from "moment";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import TripDetails from "./components/Home/TripDetails";
import { tripsHelper } from "./helpers/tripsHelper";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            availableCars: [],
            filteredTripsByDriver: [],
            filterByDriver: "all",
            sortByDate: "desc"
        };
    }

    async componentDidMount() {
        const { trips } = await tripsHelper();
        this.setState({ trips })
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
        
        // this.props.history.push("/");
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
                                    handleSubmitBooking={this.handleSubmitBooking}
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
