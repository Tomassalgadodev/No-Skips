import React from "react";
import './SavedAlbumCard';

import likedIcon from '../assets/liked_icon.png';

const SavedAlbumCard = ({ link, albumArt, albumTitle, yearReleased, artistName, removeAlbum }) => {
    return (
        <div id={link}>
            <img src={albumArt} />
            <h2>{albumTitle}</h2>
            <p>{yearReleased}</p>
            <img 
                className="heart-icon" 
                src={likedIcon} 
                onClick={() => removeAlbum({ link })}
            />
            <h3>{artistName}</h3>
        </div>
    )
}

export default SavedAlbumCard;