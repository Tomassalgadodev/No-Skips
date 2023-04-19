import React from "react";
import './HomePage.css';

import UserDashboard from "../UserDashboard/UserDashboard";

const HomePage = ({ loggedIn, savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken }) => {

    if (loggedIn) {
        return (
            <UserDashboard 
                savedAlbums={savedAlbums}
                removeAlbum={removeAlbum}
                saveAlbum={saveAlbum}
                spotifyAccessToken={spotifyAccessToken}
            />
        )
    }
    return (
        <h1>-- This is where the home page will go --</h1>
    )
}

export default HomePage;