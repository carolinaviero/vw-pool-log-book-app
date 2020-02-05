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
            allTrips: [
                {
                    id: 1,
                    driver: "Manuel dos Santos",
                    startDate: "2020-05-02 12:00:00",
                    endDate: "2020-05-02 14:00:00",
                    destination: "Oeiras",
                    startMileage: "20000",
                    endMileage: "20010",
                    image: car1
                },
                {
                    id: 2,
                    driver: "Mário Pinto",
                    startDate: "2020-06-22 14:00:00",
                    endDate: "2020-06-23 16:00:00",
                    destination: "Sintra",
                    startMileage: "18000",
                    endMileage: "18020",
                    image: car1
                },
                {
                    id: 3,
                    driver: "Pedro Pinto",
                    startDate: "2020-06-22 16:00:00",
                    endDate: "2020-06-23 17:00:00",
                    destination: "Sintra",
                    startMileage: "18000",
                    endMileage: "18020",
                    image: car1
                },
                {
                    id: 4,
                    driver: "João Pinto",
                    startDate: "2020-06-22 12:00:00",
                    endDate: "2020-06-23 13:00:00",
                    destination: "Sintra",
                    startMileage: "18000",
                    endMileage: "18020",
                    image: car2
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
                      ...prevState.allTrips.sort(
                          (a, b) => moment(a.startDate) - moment(b.startDate)
                      ),
                      sortByDate: "asc"
                  }
                : {
                      ...prevState.allTrips.sort(
                          (a, b) => moment(b.startDate) - moment(a.startDate)
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
        const { allTrips } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Home
                                    allTrips={allTrips}
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
