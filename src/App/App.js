import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import SearchPage from '../SearchPage/SearchPage';
import ArtistPage from '../ArtistPage/ArtistPage';
import LogInPage from '../LogInPage/LogInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import AlbumDetailsPage from '../AlbumDetailsPage/AlbumDetailsPage';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  
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
      setSavedAlbums(data.albums);
      setFriendsList(data.friends_list);

      try {
        const accountInfo = await fetch('http://localhost:8000/api/v1/user', {
          credentials: 'include'
        });

        if(!accountInfo.ok) {
          throw new Error(accountInfo.status);
        }

        const userAccount = await accountInfo.json();
        setAccountInfo(userAccount);

      } catch (err) {
        setLoggedIn(false);
        setUserData({});
        setAccountInfo({});
        setSavedAlbums([]);
        setFriendsList([]);
        console.log(err.message);
      }

    } catch (err) {
      if (err.message === '401') {
        setLoggedIn(false);
        setUserData({});
        setAccountInfo({});
        setSavedAlbums([]);
        setFriendsList([]);
        console.error('Not logged in');
      }
    }
  }

  const fetchUserAlbumData = async () => {
    try {
      const fetchAlbumAttempt = await fetch('http://localhost:8000/api/v1/savedAlbums', {
        credentials: 'include'
      })

      if(!fetchAlbumAttempt.ok) {
        throw new Error(fetchAlbumAttempt.status);
      }

      const data = await fetchAlbumAttempt.json();

      setSavedAlbums(data);

    } catch (err) {
      console.log(err);
    }
  }

  const saveAlbum = async (album) => {
    try {
      const addAlbumAttempt = await fetch('http://localhost:8000/api/v1/addSavedAlbum', {
        method: 'POST',
        body: JSON.stringify(album),
        headers: {
            "Content-Type": "application/JSON"
        },
        credentials: 'include'
      });

      if (!addAlbumAttempt.ok) {
        throw new Error(addAlbumAttempt.status);
      }

      const result = await addAlbumAttempt.json();

      if (result.msg !== 'Album already liked') {
        fetchUserAlbumData();
      }

    } catch (err) {
      console.log(err);
    }
  }

  const removeAlbum = async (link) => {
    try {
      const removeAlbumAttempt = await fetch('http://localhost:8000/api/v1/removeSavedAlbum', {
        method: 'POST',
        body: JSON.stringify(link),
        headers: {
            "Content-Type": "application/JSON"
        },
        credentials: 'include'
      });

      if (!removeAlbumAttempt.ok) {
        throw new Error(removeAlbumAttempt.status);
      }

      const result = await removeAlbumAttempt.json();

      if (result.msg !== 'Album not liked by user') {
        fetchUserAlbumData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  window.onpopstate = e => {
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const loginUser = (loginInfo) => {
    setLoggedIn(true);
    fetchUserData();
  }

  const logoutUser = () => {
    setLoggedIn(false);
    setUserData({});
    setAccountInfo({});
    setSavedAlbums([]);
    setFriendsList([]);
  }
  
  return (
    <React.Fragment>
      <Header 
        loggedIn={loggedIn}
        logoutUser={logoutUser}
        userFirstName={accountInfo.first_name}
      />
      <Route exact path='/' render={() => {
        return (
          <HomePage 
            loggedIn={loggedIn}
            savedAlbums={savedAlbums}
            removeAlbum={removeAlbum}
          />
        )
      }}/>
      <Route exact path='/search/:searchTerm' render={({ match }) => {
        return (
          <SearchPage searchTerm={match.params.searchTerm} />
        )
      }}/>
      <Route exact path='/artist/:artistID' render={({ match }) => {
        return (
          <ArtistPage 
            artistID={match.params.artistID}
            likedAlbums={loggedIn ? savedAlbums : []}
            saveAlbum={saveAlbum}
            removeAlbum={removeAlbum}
          />
        )
      }}/>
      <Route exact path='/album/:albumID' render={({ match }) => {
        return (
          <AlbumDetailsPage 
            albumID={match.params.albumID}
            likedAlbums={loggedIn ? savedAlbums : []}
            loggedIn={loggedIn}
            saveAlbum={saveAlbum}
            removeAlbum={removeAlbum}
            fetchUserAlbumData={fetchUserAlbumData}
          />
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