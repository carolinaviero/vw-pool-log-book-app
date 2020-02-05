import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import moment from "moment";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import Confirmation from "./components/BookTrip/Confirmation";
import car1 from "./media/car-1.png";
import car2 from "./media/car-2.png";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [
                {
                    "id": 1,
                    "name": "Ed Watson",
                    "start_trip": "2020-02-02T12:00:00.000Z",
                    "end_trip": "2020-02-02T14:00:00.000Z",
                    "destination": "Rato",
                    "car_start_mileage": 40672,
                    "car_end_mileage": 40677,
                    "car_id": 1,
                    "image_url": car1
                },
                {
                    "id": 2,
                    "name": "Nuno Lima",
                    "start_trip": "2020-02-03T14:00:00.000Z",
                    "end_trip": "2020-02-03T16:00:00.000Z",
                    "destination": "Alameda",
                    "car_start_mileage": 50672,
                    "car_end_mileage": 50677,
                    "car_id": 2,
                    "image_url": car2
                },
                {
                    "id": 3,
                    "name": "Carolina Viero",
                    "start_trip": "2020-02-03T18:00:00.000Z",
                    "end_trip": "2020-02-03T20:00:00.000Z",
                    "destination": "Alameda",
                    "car_start_mileage": 50677,
                    "car_end_mileage": 50682,
                    "car_id": 2,
                    "image_url": car1
                },
                {
                    "id": 4,
                    "name": "Angélina Riet",
                    "start_trip": "2020-02-04T12:00:00.000Z",
                    "end_trip": "2020-02-04T14:00:00.000Z",
                    "destination": "Rato",
                    "car_start_mileage": 40677,
                    "car_end_mileage": 40682,
                    "car_id": 1,
                    "image_url": car1
                }
            ],
            filterBy: "",
            sortByDate: "desc"
        };
    }

    componentDidMount() {
        // sort trips arr by date
        // sort((a, b) => moment(b.startDate) - moment(a.startDate))
    }

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
    handleDateSubmit = () => {
        console.log("time and date");
        this.props.history.push("/confirmation");
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
        const { trips } = this.state;

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
                                    onSortByDate={this.handleSortByDate}
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
                    </Switch>
                </header>
            </div>
        );
    }
}

export default withRouter(App);
