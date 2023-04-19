import React from "react";
import './SavedAlbumContainer.css';

import SavedAlbumCard from "../SavedAlbumCard/SavedAlbumCard";

const SavedAlbumContainer = ({ savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken }) => {

    const savedAlbumCards = savedAlbums.map(album => {

        const likedSongs = JSON.parse(album.likedSongs);

        return (
            <SavedAlbumCard 
                albumArt={album.albumArt}
                albumTitle={album.albumTitle}
                yearReleased={album.yearReleased}
                link={album.link}
                key={album.link}
                artistName={album.artistName}
                removeAlbum={removeAlbum}
                artistID={album.artistID}
                albumID={album.albumID}
                saveAlbum={saveAlbum}
                previouslyLikedSongs={likedSongs}
                spotifyAccessToken={spotifyAccessToken}
            />
        )
    })



    return (
        <div className="dashboard-container">
            <h1 className="heading">Your albums</h1>
            <div className="saved-album-container">
                {savedAlbumCards}
            </div>
        </div>
    )
}

export default SavedAlbumContainer;