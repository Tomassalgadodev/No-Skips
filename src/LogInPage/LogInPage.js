import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import './LogInPage.css';

import { authorizeUser } from "../spotifyUserAuthorization";

import logo from '../assets/anthology-logo.png';
import errorIcon from '../assets/error-icon.png';
import greySpotifyIcon from '../assets/spotify-icon-grey.png';
import whiteSpotifyIcon from '../assets/spotify-icon-white.png';

const LogInPage = ({ loginUser, loggedIn, clientID }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonImage, setButtonImage] = useState(greySpotifyIcon);

    const history = useHistory();

    const login = async e => {

        e.preventDefault();

        try {

            const loginBody = { username, password, linkedToSpotify: false };

            const attempt = await fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                body: JSON.stringify(loginBody),
                headers: {
                    "Content-Type": "application/JSON"
                },
                credentials: 'include'
            });
    
            if (!attempt.ok) {
                throw new Error (attempt.status);
            }

            const loginInfo = await attempt.json();

            loginUser(loginInfo);

            history.push('/');

        } catch (err) {
            if (err.message === '401') {
                console.log(err)
                setErrorMessage('Wrong password');
            } else if (err.message === '404') {
                setErrorMessage('No account with that username');
            } else if (err.message === '422') {
                setErrorMessage('Account linked with Spotify. Log in with Spotify');
            } else {
                console.log(err.message);
            }
        }
    }

    if (loggedIn) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <form className="log-in-form" onSubmit={login}>
            <div className="sign-up-heading-container">
                <img className="sign-up-logo" src={logo} />
                <p className="sign-up-heading">Anthology</p>
            </div>
            <h2 className="sign-up-sub-heading">To continue, log in to Anthology.</h2>
            <button
                className="spotify-log-in-button"
                onClick={(e) => {
                    e.preventDefault();
                    authorizeUser(clientID);
                }}
                onMouseEnter={() => setButtonImage(whiteSpotifyIcon)}
                onMouseLeave={() => setButtonImage(greySpotifyIcon)}
            >
                <img src={buttonImage} />
                CONTINUE WITH SPOTIFY
            </button>
            <div className="login-or-container">
                <hr className="login-or-line"></hr>
                <p className="login-or-text">OR</p>
                <hr className="login-or-line"></hr>
            </div>
            <div className={errorMessage ? 'log-in-error-container' : 'hidden log-in-error-container'}>
                <img className="log-in-error-icon" src={errorIcon} />
                <p className="log-in-error-message">{errorMessage}</p>
            </div>
            <div className="input-container">
                <p className="input-label">Username</p>
                <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
            </div>
            <div className="input-container">
                <p className="input-label">Password</p>
                <input className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </div>
            <button className="sign-up-form-button">Log In</button>
            <hr className="line-break" />
            <p className="login-footer">Don't have an account?</p>
            <NavLink className="signup-redirect-button" to="/signup">SIGN UP FOR ANTHOLOGY</NavLink>
        </form>
    )
}

export default LogInPage;