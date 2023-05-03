import React, { useEffect, useState } from "react";
import './HomePage.css';

import { authorizeUser } from "../spotifyUserAuthorization";

import UserDashboard from "../UserDashboard/UserDashboard";
import AccountSetUpPage from "../AccountSetUpPage/AccountSetUpPage";
import { NavLink, useHistory } from "react-router-dom";

import homepageImage from '../assets/homepage-image.png';
import greySpotifyIcon from '../assets/spotify-icon-grey.png';
import whiteSpotifyIcon from '../assets/spotify-icon-white.png';

const HomePage = ({ loggedIn, savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken, clientID, loginUser }) => {

    let oAuthCode;

    const history = useHistory();

    const [buttonImage, setButtonImage] = useState(greySpotifyIcon);

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
                <div className="homepage-container">
                    <div className="homepage-image-container" style={{ backgroundImage: `url(${homepageImage})` }}></div>
                    <div className="welcome-container">
                        <h1 className="welcome-header" style={{ color: 'white' }}>Welcome to Anthology,</h1>
                        <h1 className="welcome-header" style={{ color: 'white' }}>Sign in to continue.</h1>
                        <button
                            className="spotify-sign-up-button"
                            onClick={() => authorizeUser(clientID)}
                            onMouseEnter={() => setButtonImage(whiteSpotifyIcon)}
                            onMouseLeave={() => setButtonImage(greySpotifyIcon)}
                        >
                            <img src={buttonImage} />
                            CONTINUE WITH SPOTIFY
                        </button>
                        <div className="or-container">
                            <hr className="or-line"></hr>
                            <p className="or-text">OR</p>
                            <hr className="or-line"></hr>
                        </div>
                        <button 
                            className="homepage-log-in-button"
                            onClick={() => history.push('/login')}    
                        >LOG IN</button>
                        <p className="dont-have-an-account-tag" style={{ color: 'white' }}>Don't have an account? <NavLink to='/signup' className='login-redirect'>Create an account</NavLink></p>
                    </div>
                </div>
            }
            {!loggedIn && window.location.search.substring(0, 6) === '?code=' &&
                <AccountSetUpPage 
                    oAuthCode={oAuthCode} 
                    clientID={clientID}
                    loginUser={loginUser}
                />
            }
        </>
    )
}

export default HomePage;