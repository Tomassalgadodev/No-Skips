import React from "react";
import './AlbumCard.css';

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';

const AlbumCard = ({ albumArt, albumTitle, yearReleased, link, isLiked, artistName, artistID, saveAlbum, removeAlbum }) => {

    const albumData = { albumArt, albumTitle, yearReleased, link, artistName, artistID };

    return (
        <div className="album-card" id={link}>
            <img className="album-art" src={albumArt} />
            <div className="title-container">
                <div className="title-box">
                    <h2 className="album-title">{albumTitle}</h2>
                </div>
                <img 
                    className="heart-icon" 
                    src={isLiked ? likedIcon : unlikedIcon} 
                    onClick={() => isLiked ? removeAlbum({ link }) : saveAlbum(albumData)}
                />
            </div>
            <div className="details-container">
                <p className="album-details">{yearReleased}</p>
            </div>
        </div>
    )
}

export default AlbumCard;