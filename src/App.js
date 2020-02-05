import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        <Switch>
          <Route exact path="/"/>
          <Route exact path="/"/>
          <Route exact path="/" />
        </Switch>
        </header>
      </div>
    );
  }
}

export default App;
