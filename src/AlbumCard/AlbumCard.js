import React, { useState } from "react";
import './AlbumCard.css';

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const AlbumCard = ({ albumArt, albumTitle, yearReleased, link, isLiked, artistName, artistID, saveAlbum, removeAlbum }) => {

    const [unlikedHeart, setUnlikedHeart] = useState(unlikedIcon);
    const [unlikedVisibility, setUnlikedVisbility] = useState('heart-icon hidden');

    const albumData = { albumArt, albumTitle, yearReleased, link, artistName, artistID };

    const highlightHeartIcon = () => {
        if (!isLiked) {
            setUnlikedHeart(whiteUnlikedIcon);
        }
    }

    const unhighlightHeartIcon = () => {
        if (!isLiked) {
            setUnlikedHeart(unlikedIcon);
        }
    }

    const showHeartIcon = () => {
        if (!isLiked) {
            setUnlikedVisbility('heart-icon');
        }
    }

    const hideHeartIcon = () => {
        if (!isLiked) {
            setUnlikedVisbility('heart-icon hidden');
        }
    }

    return (
        <div className="album-card" 
            id={link}
            onMouseOver={showHeartIcon}
            onMouseOut={hideHeartIcon}
        >
            <img className="album-art" src={albumArt} />
            <div className="title-container">
                <div className="title-box">
                    <h2 className="album-title">{albumTitle}</h2>
                </div>
                <img 
                    className={isLiked ? 'heart-icon' : unlikedVisibility} 
                    src={isLiked ? likedIcon : unlikedHeart} 
                    onClick={() => isLiked ? removeAlbum({ link }) : saveAlbum(albumData)}
                    onMouseOver={highlightHeartIcon}
                    onMouseOut={unhighlightHeartIcon}
                />
            </div>
            <div className="details-container">
                <p className="album-details">{yearReleased}</p>
            </div>
        </div>
    )
}

export default AlbumCard;