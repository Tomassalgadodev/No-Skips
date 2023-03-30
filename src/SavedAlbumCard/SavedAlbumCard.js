import React from "react";
import { useHistory } from "react-router-dom";
import './SavedAlbumCard.css';

import likedIcon from '../assets/liked_icon.png';

const SavedAlbumCard = ({ link, albumArt, albumTitle, yearReleased, artistName, removeAlbum, artistID, albumID }) => {

    const history = useHistory();

    return (
        <div className="album-card" id={link}>
            <img 
                className="album-art" 
                src={albumArt} 
                onClick={() => window.open(link, '_blank')}
            />
            <div className="title-container">
                <div className="title-box">
                    <h2 onClick={() => history.push(`/album/${albumID}`)} className="album-title">{albumTitle}</h2>
                </div>
                <img 
                    className="heart-icon"
                    src={likedIcon} 
                    onClick={() => removeAlbum({ link })}
                />
            </div>
            <div className="details-container">
                <p className="album-details">{yearReleased} • <span className="saved-album-artist-link" onClick={() => history.push(`/artist/${artistID}`)}>{artistName}</span></p>
            </div>
        </div>
    )
}

export default SavedAlbumCard;