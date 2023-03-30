import React, { useState } from "react";
import './SongModalSongCard.css';

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const SongModalSongCard = ({ trackNumber, trackName, trackArtists, numberOfStreams, trackLength }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [heartIcon, setHeartIcon] = useState(likedIcon);

    return (
        <div
            className="mini-song-card"
        >
            <div className="mini-track-number-container">
                <p className="mini-track-number">{trackNumber}</p>
            </div>
            <div className="mini-track-name-container">
                <p className="mini-track-name">{trackName}</p>
            </div>
            <img 
                className="mini-song-heart-icon" 
                src={heartIcon} 
            />
        </div>
    )
}

export default SongModalSongCard;