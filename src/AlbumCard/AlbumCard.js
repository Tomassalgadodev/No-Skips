import React from "react";
import './AlbumCard.css';

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';

const AlbumCard = ({ albumArt, albumTitle, yearReleased, link, isLiked, artistName, artistID, saveAlbum, removeAlbum }) => {

    const albumData = { albumArt, albumTitle, yearReleased, link, artistName, artistID };

    return (
        <div id={link}>
            <img src={albumArt} />
            <h2>{albumTitle}</h2>
            <p>{yearReleased}</p>
            <img 
                className="heart-icon" 
                src={isLiked ? likedIcon : unlikedIcon} 
                onClick={() => isLiked ? removeAlbum({ link }) : saveAlbum(albumData)}
            />
        </div>
    )
}

export default AlbumCard;