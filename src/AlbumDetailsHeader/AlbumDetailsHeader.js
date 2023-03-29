import React from "react";
import './AlbumDetailsHeader.css';

const AlbumDetailsHeader = ({ albumImage, albumTitle, artistThumbnail, artistName, artistID, albumType, numberOfSongs, albumLength }) => {
    return (
        <div>
            <img src={albumImage} />
            <p>{albumType}</p>
            <p>{albumTitle}</p>
            <img src={artistThumbnail} />
            <p>{artistName}</p>
            <p>{numberOfSongs} Songs</p>
        </div>
    )
}

export default AlbumDetailsHeader;