import React from "react";
import './UserDashboard.css';

import SavedAlbumContainer from "../SavedAlbumContainer/SavedAlbumContainer";

const UserDashboard = ({ savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken }) => {
    return (
        <React.Fragment>
            <SavedAlbumContainer 
                savedAlbums={savedAlbums}
                removeAlbum={removeAlbum}
                saveAlbum={saveAlbum}
                spotifyAccessToken={spotifyAccessToken}
            />
        </React.Fragment>
    )
}

export default UserDashboard;