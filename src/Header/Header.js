import React, { useState } from "react";
import './Header.css';

import SearchForm from "../SearchForm/SearchForm";
import { NavLink, useHistory } from "react-router-dom";

import profilePic from '../assets/profile-pic.png';
import downArrow from '../assets/down-arrow.png';
import upArrow from '../assets/up-arrow.png';
import hamburger from '../assets/hamburger-icon.png';
import logo from '../assets/anthology-logo.png';
import DropDownMenu from "../DropDownMenu/DropDownMenu";

const Header = ({ loggedIn, logoutUser, userFirstName }) => {

    const [dropDownActive, setDropDownActive] = useState(false);

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
                setDropDownActive(false);
                logoutUser();
            } else {
                console.log('Log out failed');
            }
        } catch (err) {

        }
    }

    const hideDropDown = () => {
        setDropDownActive(false);
    }

    if (loggedIn) {
        return (
            <header>
                <img src={logo} onClick={() => history.push('/')} className="logo" />
                <h1 className="home-button" onClick={() => history.push('/')}>Anthology</h1>
                <SearchForm />
                <div className="account-button-and-dropdown-container">
                    <button 
                        className="account-button"
                        onClick={() => setDropDownActive(!dropDownActive)}
                    >
                        <img className="profile-picture" src={profilePic} />
                        <span className="username">
                            {userFirstName}
                        </span>
                        <img className="arrow-icon" src={dropDownActive ? upArrow : downArrow} />
                    </button>
                    {dropDownActive && <DropDownMenu hideDropDown={hideDropDown} logout={logout} />}
                </div>
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
            <img    
                className="hamburger-icon" 
                src={hamburger} 
                onClick={() => setDropDownActive(!dropDownActive)}
            />
            {dropDownActive &&
                <div className="logged-out-drop-down-container">
                    <NavLink onClick={hideDropDown} to="/signup" className="drop-down-button">Sign up</NavLink>
                    <NavLink onClick={hideDropDown} to="/login" className="drop-down-button">Log in</NavLink>
                </div>
            }
        </header>
    )
}

export default Header;