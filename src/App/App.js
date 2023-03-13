import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import SearchPage from '../SearchPage/SearchPage';
import ArtistPage from '../ArtistPage/ArtistPage';
import LogInPage from '../LogInPage/LogInPage';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  
  render() {

    return (
      <React.Fragment>
        <Header />
        <Route exact path='/' render={() => {
          return (
            <HomePage />
          )
        }}/>
        <Route exact path='/search/:searchTerm' render={({ match }) => {
          return (
            <SearchPage searchTerm={match.params.searchTerm} />
          )
        }}/>
        <Route exact path='/artist/:artistID' render={({ match }) => {
          return (
            <ArtistPage artistID={match.params.artistID}/>
          )
        }}/>
        <Route exact path='/login' render={() => {
          return (
            <LogInPage />
          )
        }}/>
      </React.Fragment>
    );
  }
}

export default App;