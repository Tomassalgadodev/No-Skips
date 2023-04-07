import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './SavedAlbumCard.css';

import likedIcon from '../assets/liked_icon.png';

const SavedAlbumCard = ({ link, albumArt, albumTitle, yearReleased, artistName, removeAlbum, artistID, albumID }) => {

    const history = useHistory();

    const [albumArtTop, setAlbumArtTop] = useState('20px');
    const [albumTitleTop, setAlbumTitleTop] = useState('295px');
    const [albumDetailsTop, setAlbumDetailsTop] = useState('335px');
    const [songModalStyle, setSongModalStyle] = useState({ bottom: '70px', height: '0px', border: 'none' });
    const [songModalActive, setSongModalActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [startedFetch, setStartedFetch] = useState(false);
    const [albumData, setAlbumData] = useState({});
    const [likedSongs, setLikedSongs] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);

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
    
    const handleHeartIconClick = () => {
        if (songModalActive) {
            toggleSongModal();
        } else {
            setShowDropDown(!showDropDown);
        }
    }

    return (
        <div className="album-card-wrapper">
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
                        onClick={handleHeartIconClick}
                    />
                </div>
                <div className="details-container">
                    <p className="album-details">{yearReleased} • <span className="saved-album-artist-link" onClick={() => history.push(`/artist/${artistID}`)}>{artistName}</span></p>
                </div>
            </div>
            {showDropDown &&
                <div className="remove-edit-menu">
                    <div 
                        className="remove-edit-menu-button"
                        // onClick={showSongs}
                    >Edit album</div>
                    <div 
                        className="remove-edit-menu-button"
                        // onClick={handleRemoveAlbum}
                    >Remove album</div>
                </div>        
            }
        </div>
    )
}

export default SavedAlbumCard;