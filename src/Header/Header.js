import React from "react";
import './Header.css';

import SearchForm from "../SearchForm/SearchForm";
import { useHistory } from "react-router-dom";

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
                <h1 className="home-button" onClick={() => history.push('/')}>Anthology</h1>
                <SearchForm />
                <button>{`${userFirstName}'s Account`}</button>
                <button onClick={logout}>Log Out</button>
            </header>
        )
    }

    return (
        <header>
            <div className="logo"></div>
            <h1 className="home-button" onClick={() => history.push('/')}>Anthology</h1>
            <SearchForm />
            <div className="button-container">
                <button className="sign-up-button" onClick={() => history.push('/signup')}>Sign up</button>
                <button className="log-in-button" onClick={() => history.push('/login')}>Log in</button>
            </div>
        </header>
    )
}

export default Header;