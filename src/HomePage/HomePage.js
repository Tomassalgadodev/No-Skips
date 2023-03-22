import React from "react";
import './HomePage.css';

const HomePage = ({ loggedIn }) => {

    if (loggedIn) {
        return (
            <h1>-- Logged In --</h1>
        )
    }
    return (
        <h1>-- This is where the home page will go --</h1>
    )
}

export default HomePage;