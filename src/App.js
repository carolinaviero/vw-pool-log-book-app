import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import  from './components/Auth/SignUp';
import SignUp from './components/Auth/SignUp';
import SignUp from './components/Auth/SignUp';
import SignUp from './components/Auth/SignUp';

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
          <Route exact path="/" />
        </Switch>
        </header>
      </div>
    );
  }
}

export default App;
