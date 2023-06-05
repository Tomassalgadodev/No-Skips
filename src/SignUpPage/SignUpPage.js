import React, { useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import './SignUpPage.css';

import { authorizeUser } from "../spotifyUserAuthorization";

import logo from '../assets/anthology-logo.png';
import errorIcon from '../assets/error-icon.png';
import greySpotifyIcon from '../assets/spotify-icon-grey.png';
import whiteSpotifyIcon from '../assets/spotify-icon-white.png';

const SignUpPage = ({ loggedIn, loginUser, clientID }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [userExistsError, setUserExistsError] = useState(false);
    const [passwordsMustMatchError, setPasswordsMustMatchError] = useState(false);
    const [buttonImage, setButtonImage] = useState(greySpotifyIcon);


    const history = useHistory();

    if (loggedIn) {
        return (
            <Redirect to='/' />
        )
    }

    const confirmPasswordMatch = e => {
        if (e.target.name === 'password') {
            setPassword(e.target.value);
            setPasswordMatch(e.target.value === passwordConfirm);
        } else {
            setPasswordConfirm(e.target.value);
            setPasswordMatch(e.target.value === password);
        }
    }

    const createNewUser = async e => {
        e.preventDefault();

        if (!passwordMatch) {
            setPasswordsMustMatchError(true);
            console.log('Passwords must match');
            return;
        } else {
            setPasswordsMustMatchError(false);
        }

        try {

            const signupBody = {
                username,
                password,
                firstname: firstName,
                lastname: lastName,
                email,
                linkedToSpotify: false
            };

            const attempt = await fetch('https://anthology-server.herokuapp.com/api/v1/users', {
                method: 'POST',
                body: JSON.stringify(signupBody),
                headers: {
                    "Content-Type": "application/JSON"
                },
                credentials: 'include'
            });
    
            if (!attempt.ok) {
                throw new Error (attempt.status);
            }

            const attemptMessage = await attempt.json();

            console.log(attemptMessage);

// Same code as in login function from LogInPage Component. Refactor later to have this function declared in App component and pass down as props to both SignUpPage and LogInPage

            try {

                const loginBody = { username, password };

                const attempt = await fetch('https://anthology-server.herokuapp.com/api/v1/login', {
                    method: 'POST',
                    body: JSON.stringify(loginBody),
                    headers: {
                        "Content-Type": "application/JSON"
                    },
                    credentials: 'include'
                });
        
                if (!attempt.ok) {
                    throw new Error (attempt);
                }

                const loginInfo = await attempt.json();

                loginUser(loginInfo);

                history.push('/');

            } catch (err) {
                // Show message on page that user failed their login
                console.log(err);
            }
            
        } catch (err) {
            if (err.message === '409') {
                setUserExistsError(true);
                console.error('Error: That username already exists. Please choose another');
            }
        }
        
    }

    return (
        <form onSubmit={createNewUser} className="sign-up-form">
            <div className="sign-up-heading-container">
                <img className="sign-up-logo" src={logo} />
                <p className="sign-up-heading">Anthology</p>
            </div>
            <h2 className="sign-up-sub-heading">Sign up for free to start discovering.</h2>
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
            <div className="input-container">
                <p className="input-label">What's your first name?</p>
                <input className="input" placeholder="Enter your first name." value={firstName} onChange={e => setFirstName(e.target.value)} required/>
            </div>
            <div className="input-container">
                <p className="input-label">What's your last name?</p>
                <input className="input" placeholder="Enter your last name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
            </div>
            <div className="input-container">
                <p className="input-label">What's your email?</p>
                <input className="input" placeholder="Enter your email." value={email} onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="input-container">
                <p className="input-label">What should we call you?</p>
                <input className="input" placeholder="Enter a profile name." value={username} onChange={e => setUsername(e.target.value)} required/>
                <div className={userExistsError ? 'error-container' : 'hidden error-container'}>
                    <img className="error-icon" src={errorIcon} />
                    <p className="sign-up-error">This username is already connected to an account. <NavLink className="login-redirect-error" to="login">Log in</NavLink>.</p>
                </div>
            </div>
            <div className="input-container">
                <p className="input-label">Create a password.</p>
                <input className="input" placeholder="Create a password." value={password} name='password' onChange={confirmPasswordMatch} required/>
            </div>
            <div className="input-container">
                <p className="input-label">Confirm your password.</p>
                <input className="input" placeholder="Enter your password again." value={passwordConfirm} onChange={confirmPasswordMatch} required/>
                <div className={passwordsMustMatchError ? 'error-container' : 'hidden error-container'}>
                    <img className="error-icon" src={errorIcon} />
                    <p className="sign-up-error">The passwords don't match.</p>
                </div>
            </div>
            <button className="sign-up-form-button">Sign up</button>
            <p className="sign-up-footer">Have an account? <NavLink className="login-redirect" to="/login">Log in</NavLink>.</p>
        </form>
    )
}

export default SignUpPage;