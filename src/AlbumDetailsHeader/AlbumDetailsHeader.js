import React from "react";
import './AlbumDetailsHeader.css';

const AlbumDetailsHeader = ({ albumImage, albumTitle, artistThumbnail, artistName, artistID, albumType, numberOfSongs, albumLength, backgroundColor, yearReleased }) => {
    return (
        <div style={{ backgroundColor: backgroundColor }} className="album-details-header">
            <div className="album-details-content-container">
                <div className="album-details-image-container">
                    <img className="album-details-image" src={albumImage} />
                </div>
                <div className="album-details-wrapper">
                    <div className="album-details-container">
                        <p className="album-type">{albumType}</p>
                        <p className="album-details-title">{albumTitle}</p>
                        <div className="album-details-subheading-container">
                            <img className="album-details-artist-thumbnail" src={artistThumbnail} />
                            <p className="album-details-subheading"><span className="album-details-artist-link">{artistName}</span> • <span>{yearReleased}</span> • <span>{numberOfSongs} Songs</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tint"></div>
        </div>
    )
}

export default AlbumDetailsHeader;