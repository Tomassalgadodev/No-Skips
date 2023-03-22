import React from "react";
import './SavedAlbumContainer.css';

import SavedAlbumCard from "../SavedAlbumCard/SavedAlbumCard";

const SavedAlbumContainer = ({ savedAlbums, removeAlbum }) => {

    const savedAlbumCards = savedAlbums.reverse().map(album => {
        return (
            <SavedAlbumCard 
                albumArt={album.albumArt}
                albumTitle={album.albumTitle}
                yearReleased={album.yearReleased}
                link={album.link}
                key={album.link}
                artistName={album.artistName}
                removeAlbum={removeAlbum}
            />
        )
    })



    return (
        <div>
            {savedAlbumCards}
        </div>
    )
}

export default SavedAlbumContainer;