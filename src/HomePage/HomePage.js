import React from "react";
import './HomePage.css';

import UserDashboard from "../UserDashboard/UserDashboard";

const HomePage = ({ loggedIn, savedAlbums, removeAlbum, saveAlbum }) => {

    if (loggedIn) {
        return (
            <UserDashboard 
                savedAlbums={savedAlbums}
                removeAlbum={removeAlbum}
                saveAlbum={saveAlbum}
            />
        )
    }
    return (
        <h1>-- This is where the home page will go --</h1>
    )
}

export default HomePage;