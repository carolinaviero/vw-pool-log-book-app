import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import BookTrip from "./components/BookTrip/BookTrip";
import Confirmation from "./components/BookTrip/Confirmation";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                            render={() => <BookTrip />}
                        />
                        <Route
                            exact
                            path="/confirmation"
                            render={() => <Confirmation />}
                        />
                    </Switch>
                </header>
            </div>
        );
    }
}

export default App;
