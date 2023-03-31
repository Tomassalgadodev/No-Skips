import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './AlbumCard.css';

import SongModal from "../SongModal/SongModal";

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

import greyPlusIcon from '../assets/grey-plus-icon.png';
import whitePlusIcon from '../assets/white-plus-icon.png';
import greyMinusIcon from '../assets/grey-minus-icon.png';
import whiteMinusIcon from '../assets/white-minus-icon.png';

const AlbumCard = ({ albumArt, albumTitle, yearReleased, link, isLiked, artistName, artistID, saveAlbum, removeAlbum, albumID, liked, previouslyLikedSongs }) => {

    const [icon, setIcon] = useState(greyPlusIcon);
    const [iconVisible, setIconVisible] = useState(false);
    const [albumArtTop, setAlbumArtTop] = useState('20px');
    const [albumTitleTop, setAlbumTitleTop] = useState('295px');
    const [albumDetailsTop, setAlbumDetailsTop] = useState('335px');
    const [songModalStyle, setSongModalStyle] = useState({ bottom: '70px', height: '0px', border: 'none' });
    const [songModalActive, setSongModalActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [startedFetch, setStartedFetch] = useState(false);
    const [albumData, setAlbumData] = useState({});
    const [trackData, setTrackData] = useState({});
    const [likedSongs, setLikedSongs] = useState([]);

    const history = useHistory();

    let albumObject = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID};

    const fetchAlbumData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/album/${albumID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const [albumData, trackData] = await response.json();

            setAlbumData(albumData);
            setTrackData(trackData);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const addLikedSong = likedSong => {
        if (!likedSongs.some(song => song.trackName === likedSong.trackName && song.trackNumber === likedSong.trackNumber)) {
            setLikedSongs([...likedSongs, likedSong]);
        }
    }

    const removeLikedSong = unLikedSong => {
        setLikedSongs(likedSongs.filter(song => song.trackName !== unLikedSong.trackName && song.trackNumber !== unLikedSong.trackNumber));
    }

    const submitAlbum = () => {
        albumObject.likedSongs = JSON.stringify(likedSongs);
        saveAlbum(albumObject);
        toggleSongModal();
    }

    const highlightHeartIcon = () => {
        if (!isLiked) {
            if (!songModalActive) {
                setIcon(whitePlusIcon);
            } else {
                setIcon(whiteMinusIcon);
            }
        }
    }

    const unhighlightHeartIcon = () => {
        if (!isLiked) {
            if (!songModalActive) {
                setIcon(greyPlusIcon);
            } else {
                setIcon(greyMinusIcon);
            }
        }
    }

    const showIcon = () => {
        if (!isLiked) {
            setIconVisible(true);
        }
    }

    const hideIcon = () => {
        if (!isLiked) {
            setIconVisible(false);
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

    const showSongs = () => {
        toggleSongModal();
        if (Object.keys(albumData).length === 0 && Object.keys(trackData).length === 0 && !startedFetch) {
            setStartedFetch(true);
            fetchAlbumData();
        }
    }

    return (
        <div className="album-card" 
            id={link}
            onMouseOver={showIcon}
            onMouseOut={hideIcon}
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
                {iconVisible && !isLiked &&
                <img 
                    className={'heart-icon'}
                    src={isLiked ? likedIcon : icon} 
                    // onClick={() => isLiked ? removeAlbum({ link }) : saveAlbum(albumObject)} // OLD WAY TO SAVE AN ALBUM
                    onClick={showSongs}
                    onMouseOver={highlightHeartIcon}
                    onMouseOut={unhighlightHeartIcon}
                />}
                {isLiked &&
                    <img 
                        className={'heart-icon'}
                        src={likedIcon} 
                        onClick={showSongs}
                    />}
            </div>
            <div 
                className="details-container"
                style={{ top: albumDetailsTop }}  
            >
                <p className="album-details">{yearReleased}</p>
            </div>
            <div 
                className="song-modal-container"
                style={songModalStyle}
            >
                {loading && <h1>-- Loading --</h1>}
                {!loading && 
                    <SongModal 
                        trackData={trackData} 
                        submitAlbum={submitAlbum} 
                        addLikedSong={addLikedSong} 
                        removeLikedSong={removeLikedSong}
                        isLiked={isLiked}
                        previouslyLikedSongs={previouslyLikedSongs}
                    />}
            </div>
        </div>
    )
}

export default AlbumCard;