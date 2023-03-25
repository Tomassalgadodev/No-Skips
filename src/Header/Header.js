import React from "react";
import './Header.css';

import SearchForm from "../SearchForm/SearchForm";
import { useHistory } from "react-router-dom";

import profilePic from '../assets/profile-pic.png';
import downArrow from '../assets/down-arrow.png';
import hamburger from '../assets/hamburger-icon.png';
import logo from '../assets/anthology-logo.png';

const Header = ({ loggedIn, logoutUser, userFirstName }) => {
    const history = useHistory();

    const logout = async () => {

        try {
            const logoutAttempt = await fetch('http://localhost:8000/api/v1/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            
            const message = await logoutAttempt.json();

            if (message.msg === 'success') {
                console.log('successful logout my friend');
                logoutUser();
            } else {
                console.log('Log out failed');
            }
        } catch (err) {

        }
    }

    if (loggedIn) {
        return (
            <header>
                <img src={logo} onClick={() => history.push('/')} className="logo" />
                <h1 className="home-button" onClick={() => history.push('/')}>Anthology</h1>
                <SearchForm />
                <button className="log-out-button" onClick={logout}>Log Out</button>
                <button className="account-button">
                    <img className="profile-picture" src={profilePic} />
                    <span className="username">
                        {`${userFirstName}'s Account`}
                    </span>
                    <img className="arrow-icon" src={downArrow} />
                </button>
            </header>
        )
    }

    return (
        <header>
            <img src={logo} onClick={() => history.push('/')} className="logo" />
            <h1 className="home-button" onClick={() => history.push('/')}>Anthology</h1>
            <SearchForm />
            <div className="button-container">
                <button className="sign-up-button" onClick={() => history.push('/signup')}>Sign up</button>
                <button className="log-in-button" onClick={() => history.push('/login')}>Log in</button>
            </div>
            <img className="hamburger-icon" src={hamburger} />
        </header>
    )
}

export default Header;