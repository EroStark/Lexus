import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import AddRecipe from './components/SingleRecipe/AddRecipe'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/' component={AddRecipe}/>
        </Switch>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ShowAllComments comments={['red','green','blue']}/> */}
      </div>
    );
  }
}

export default App;
