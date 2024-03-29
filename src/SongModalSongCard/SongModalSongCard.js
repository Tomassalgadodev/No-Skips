import React, { useEffect, useState } from "react";
import './SongModalSongCard.css';

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const SongModalSongCard = ({ trackID, trackNumber, trackName, trackArtists, numberOfStreams, trackLength, addLikedSong, removeLikedSong, songIsLiked, likedSongs }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [heartIcon, setHeartIcon] = useState(unlikedIcon);

    const highlightHeartIcon = () => {
        if (!isLiked) {
            setHeartIcon(whiteUnlikedIcon);
        }
    }

    const unhighlightHeartIcon = () => {
        if (!isLiked) {
            setHeartIcon(unlikedIcon);
        }
    }

    const toggleSong = () => {
        if (!isLiked) {
            addLikedSong({ trackNumber, trackName, trackID });
            setIsLiked(true);
        } else {
            removeLikedSong({ trackNumber, trackName, trackID });
            setIsLiked(false);
        }
    }

    useEffect(() => {
        setIsLiked(songIsLiked);
    }, [likedSongs]);

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
            {!isLiked &&
                <img 
                    onMouseOver={highlightHeartIcon}
                    onMouseOut={unhighlightHeartIcon}
                    onClick={toggleSong}
                    className="mini-song-heart-icon" 
                    src={isLiked ? likedIcon : heartIcon}
                />
            }
            {isLiked &&
                <img 
                    onClick={toggleSong}
                    className="mini-song-heart-icon" 
                    src={likedIcon}
                />
            }
        </div>
    )
}

export default SongModalSongCard;