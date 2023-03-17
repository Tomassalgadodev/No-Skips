import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import SearchPage from '../SearchPage/SearchPage';
import ArtistPage from '../ArtistPage/ArtistPage';
import LogInPage from '../LogInPage/LogInPage';
import SignUpPage from '../SignUpPage/SignUpPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userData: [],
      accountInfo: {}
    }
  }

  componentDidMount = async () => {
    try {
      const user = await fetch('http://localhost:8000/api/v1/userdata');

      if (!user.ok) {
        if (user.status === 401) {
          throw new Error('Logged out');
        }
      }

      const data = await user.json();
      this.setState({ loggedIn: true, userData: data });

    } catch (err) {
        this.setState({ loggedIn: false, userData: [], accountInfo: {} });

    }
  }

  loginUser = (loginInfo) => {
    console.log(loginInfo)
    this.setState({
      loggedIn: true,
      accountInfo: loginInfo.user
    });
  }
  
  render() {

    return (
      <React.Fragment>
        <Header 
          loggedIn={this.state.loggedIn}
          userFirstName={this.state.accountInfo.first_name}
        />
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
            <LogInPage 
              loginUser={this.loginUser}
            />
          )
        }}/>
        <Route exact path='/signup' render={() => {
          return (
            <SignUpPage />
          )
        }}/>
      </React.Fragment>
    );
  }
}

export default App;