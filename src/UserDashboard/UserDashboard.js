import React from "react";
import './UserDashboard.css';

import SavedAlbumContainer from "../SavedAlbumContainer/SavedAlbumContainer";

const UserDashboard = ({ savedAlbums, removeAlbum, savedAlbum }) => {
    return (
        <React.Fragment>
            <SavedAlbumContainer 
                savedAlbums={savedAlbums}
                removeAlbum={removeAlbum}
                savedAlbum={savedAlbum}
            />
        </React.Fragment>
    )
}

export default UserDashboard;