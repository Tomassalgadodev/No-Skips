import React from "react";
import './UserDashboard.css';

import SavedAlbumContainer from "../SavedAlbumContainer/SavedAlbumContainer";

const UserDashboard = ({ savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken, loadingAlbums }) => {
    return (
        <React.Fragment>
            <SavedAlbumContainer 
                savedAlbums={savedAlbums}
                removeAlbum={removeAlbum}
                saveAlbum={saveAlbum}
                spotifyAccessToken={spotifyAccessToken}
                loadingAlbums={loadingAlbums}
            />
        </React.Fragment>
    )
}

export default UserDashboard;