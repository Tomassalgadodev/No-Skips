import React from "react";
import './UserDashboard.css';

import SavedAlbumContainer from "../SavedAlbumContainer/SavedAlbumContainer";

const UserDashboard = ({ savedAlbums, removeAlbum }) => {
    return (
        <React.Fragment>
            <SavedAlbumContainer 
                savedAlbums={savedAlbums}
                removeAlbum={removeAlbum}
            />
        </React.Fragment>
    )
}

export default UserDashboard;