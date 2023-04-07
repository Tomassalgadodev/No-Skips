import React from "react";
import './UserDashboard.css';

import SavedAlbumContainer from "../SavedAlbumContainer/SavedAlbumContainer";

const UserDashboard = ({ savedAlbums, removeAlbum, saveAlbum }) => {
    return (
        <React.Fragment>
            <SavedAlbumContainer 
                savedAlbums={savedAlbums}
                removeAlbum={removeAlbum}
                saveAlbum={saveAlbum}
            />
        </React.Fragment>
    )
}

export default UserDashboard;