import React, { useEffect } from "react";
import './HomePage.css';

import { authorizeUser } from "../spotifyUserAuthorization";

import UserDashboard from "../UserDashboard/UserDashboard";
import AccountSetUpPage from "../AccountSetUpPage/AccountSetUpPage";

const HomePage = ({ loggedIn, savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken, clientID }) => {

    let oAuthCode;

    if (window.location.search.substring(0, 6) === '?code=') {
        const urlParams = new URLSearchParams(window.location.search);
        oAuthCode = urlParams.get('code');
    }

    return (
        <>
            {loggedIn &&
                <UserDashboard 
                    savedAlbums={savedAlbums}
                    removeAlbum={removeAlbum}
                    saveAlbum={saveAlbum}
                    spotifyAccessToken={spotifyAccessToken}
                />            
            }
            {!loggedIn && window.location.search.substring(0, 6) !== '?code=' &&
                <>
                    <h1 style={{ color: 'white' }}>-- This is where the home page will go --</h1>
                    <button
                        onClick={() => authorizeUser(clientID)}
                    >Sign up with Spotify</button>
                </>
            }
            {!loggedIn && window.location.search.substring(0, 6) === '?code=' &&
                <AccountSetUpPage 
                    oAuthCode={oAuthCode} 
                    clientID={clientID}
                />
            }
        </>
    )
}

export default HomePage;