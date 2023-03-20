import React, { Component, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import SearchPage from '../SearchPage/SearchPage';
import ArtistPage from '../ArtistPage/ArtistPage';
import LogInPage from '../LogInPage/LogInPage';
import SignUpPage from '../SignUpPage/SignUpPage';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const user = await fetch('http://localhost:8000/api/v1/userdata', {
          credentials: 'include'
        });
  
        if (!user.ok) {
          throw new Error(user.status);
        }
  
        const data = await user.json();
        setLoggedIn(true);
        setUserData(data);
  
      } catch (err) {
        if (err.message === '401') {
          setLoggedIn(false);
          setUserData([]);
          setAccountInfo({});
          console.error('Not logged in');
        }
      }
    }

    fetchUserData();

  }, []);

  const loginUser = (loginInfo) => {
    console.log(loginInfo)
    setLoggedIn(true);
    setAccountInfo(loginInfo.user);
  }

  const logoutUser = () => {
    setLoggedIn(false);
    setUserData([]);
    setAccountInfo({});
  }
  
  return (
    <React.Fragment>
      <Header 
        loggedIn={loggedIn}
        logoutUser={logoutUser}
        userFirstName={accountInfo.first_name || userData.first_name}
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
            loginUser={loginUser}
            loggedIn={loggedIn}
          />
        )
      }}/>
      <Route exact path='/signup' render={() => {
        return (
          <SignUpPage 
            loginUser={loginUser}
            loggedIn={loggedIn}
          />
        )
      }}/>
    </React.Fragment>
  );
  }

export default App;