import React from "react";
import './SavedAlbumCard.css';

import likedIcon from '../assets/liked_icon.png';

const SavedAlbumCard = ({ link, albumArt, albumTitle, yearReleased, artistName, removeAlbum }) => {
    return (
        <div className="album-card" id={link}>
            <img className="album-art" src={albumArt} />
            <div className="title-container">
                <div className="title-box">
                    <h2 className="album-title">{albumTitle}</h2>
                </div>
                <img 
                    className="heart-icon" 
                    src={likedIcon} 
                    onClick={() => removeAlbum({ link })}
                />
            </div>
            <div className="details-container">
                <p className="album-details">{yearReleased} • {artistName}</p>
            </div>
        </div>
    )
}

export default SavedAlbumCard;