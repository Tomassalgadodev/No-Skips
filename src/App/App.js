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
import SignUpPopUp from '../SignUpPopUp/SignUpPopUp';
import DiscographyPage from '../DiscographyPage/DiscographyPage';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [signUpPopUpData, setSignUpPopUpData] = useState([]);
  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');

  const CLIENT_ID = 'c2cf185725914d9eb939d6539e5d3dfb';
  const CLIENT_SECRET = 'eb8f270a21a04f25be4734f91e4f520a';
  
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

  const saveAlbum = async (albumData) => {

    const [album, albumColor] = albumData

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
        return 'Success!';
      } else {
        return 'Already liked';
      }

    } catch (err) {
      if (err.message === '401') {
        setSignUpPopUpData(albumData);
        setShowSignUpPopUp(true)
        return 'Logged out';
      }
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
        return 'Successfully removed';
      } else {
        return 'Album not liked by user';
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  const getSpotifyToken = async () => {
    
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }

    try {

      const response = await fetch('https://accounts.spotify.com/api/token', authParameters);

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      setSpotifyAccessToken(data.access_token);

    } catch (err) {
      console.log(err);
    }
  }

  const searchArtists = async (searchTerm) => {
    
    const artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${spotifyAccessToken}`
      }
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, artistParameters)

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      return data;

    } catch (err) {
      console.log(err);
      return err;
    }
  }

  window.onpopstate = e => {
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
    getSpotifyToken();
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

  const hideSignUpPopUp = () => {
    setShowSignUpPopUp(false);
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
            saveAlbum={saveAlbum}
          />
        )
      }}/>
      <Route exact path='/search/:searchTerm' render={({ match }) => {
        return (
          <SearchPage 
            searchTerm={match.params.searchTerm} 
            searchArtists={searchArtists}
          />
        )
      }}/>
      <Route exact path='/artist/:artistID' render={({ match }) => {
        return (
          <ArtistPage 
            artistID={match.params.artistID}
            likedAlbums={loggedIn ? savedAlbums : []}
            saveAlbum={saveAlbum}
            removeAlbum={removeAlbum}
            loggedIn={loggedIn}
            spotifyAccessToken={spotifyAccessToken}
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
            logoutUser={logoutUser}
          />
        )
      }}/>
      <Route exact path='/singles/:artistName/:artistID' render={({ match }) => {
        return (
          <DiscographyPage 
            type='singles'
            artistID={match.params.artistID}
            artistName={match.params.artistName}
            saveAlbum={saveAlbum}
            removeAlbum={removeAlbum}
          />
        )
      }}/>
      <Route exact path='/albums/:artistName/:artistID' render={({ match }) => {
        return (
          <DiscographyPage 
            type='albums'
            artistID={match.params.artistID}
            artistName={match.params.artistName}
            saveAlbum={saveAlbum}
            removeAlbum={removeAlbum}
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
      {showSignUpPopUp &&
        <SignUpPopUp 
          signUpPopUpData={signUpPopUpData}
          hideSignUpPopUp={hideSignUpPopUp}
        />
      }
    </React.Fragment>
  );
  }

export default App;