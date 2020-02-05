import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import Confirmation from "./components/BookTrip/Confirmation";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrips: [
                {
                  name: 'Manuel dos Santos',
                  startDate: '05/02/2020 12:00:00',
                  endDate: '05/02/2020 14:00:00',
                  startMileage: '20000',
                  endMileage: '20010'
                }
              ]
        };
    }

    handleDateSubmit = () => {
        console.log("time and date")
        this.props.history.push("/confirmation")
    }
    
    handleSubmitBooking = () => {
        console.log("booked")
        this.props.history.push("/")
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
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route exact path="/" render={() => <Home />} />
                        <Route
                            exact
                            path="/booking"
                            render={() => <BookTrip
                            handleDateSubmit={this.handleDateSubmit}
                            />}
                        />
                        <Route
                            exact
                            path="/confirmation"
                            render={() => <Confirmation 
                            handleSubmitBooking={this.handleSubmitBooking}
                            />}
                        />
                    </Switch>
                </header>
            </div>
        );
    }
}

export default withRouter(App);
