import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './AlbumCard.css';

import SongCard from "../SongCard/SongCard";

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const AlbumCard = ({ albumArt, albumTitle, yearReleased, link, isLiked, artistName, artistID, saveAlbum, removeAlbum, albumID }) => {

    const [unlikedHeart, setUnlikedHeart] = useState(unlikedIcon);
    const [unlikedVisibility, setUnlikedVisbility] = useState('heart-icon hidden');
    const [albumArtTop, setAlbumArtTop] = useState('20px');
    const [albumTitleTop, setAlbumTitleTop] = useState('295px');
    const [albumDetailsTop, setAlbumDetailsTop] = useState('335px');
    const [songModalStyle, setSongModalStyle] = useState({ bottom: '70px', height: '0px', border: 'none' });
    const [songModalActive, setSongModalActive] = useState(false);
    const [loading, setLoading] = useState(true);

    const albumData = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID };

    const history = useHistory();

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

    const toggleSongModal = () => {
        if (songModalActive) {
            setAlbumArtTop('20px');
            setAlbumTitleTop('295px');
            setAlbumDetailsTop('335px');
            setSongModalStyle({ bottom: '70px', height: '0px' });
            setSongModalActive(false);
        } else {
            setAlbumArtTop('-300px');
            setAlbumTitleTop('20px');
            setAlbumDetailsTop('410px');
            setSongModalStyle({ bottom: '20px', height: '320px', border: 'solid 1px #B3B3B3' });
            setSongModalActive(true);
        }
    }

    return (
        <div className="album-card" 
            id={link}
            onMouseOver={showHeartIcon}
            onMouseOut={hideHeartIcon}
        >
            <img 
                className="album-art" 
                src={albumArt} 
                onClick={() => window.open(link, '_blank')}
                style={{ top: albumArtTop }}  
            />
            <div 
                className="title-container"
                style={{ top: albumTitleTop }}
            >
                <div className="title-box">
                    <h2 className="album-title" onClick={() => history.push(`/album/${albumID}`)}>{albumTitle}</h2>
                </div>
                <img 
                    className={isLiked ? 'heart-icon' : unlikedVisibility} 
                    src={isLiked ? likedIcon : unlikedHeart} 
                    // onClick={() => isLiked ? removeAlbum({ link }) : saveAlbum(albumData)} // OLD WAY TO SAVE AN ALBUM
                    onClick={toggleSongModal}
                    onMouseOver={highlightHeartIcon}
                    onMouseOut={unhighlightHeartIcon}
                />
            </div>
            <div 
                className="details-container"
                style={{ top: albumDetailsTop }}  
            >
                <p className="album-details">{yearReleased}</p>
            </div>
            <div 
                className="song-modal"
                style={songModalStyle}
            >
                {loading && <h1>-- Loading --</h1>}
            </div>
        </div>
    )
}

export default AlbumCard;