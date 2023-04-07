import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './SavedAlbumCard.css';

import SongModal from "../SongModal/SongModal";
import LoadingSongModal from "../LoadingSongModal/LoadingSongModal";

import likedIcon from '../assets/liked_icon.png';

const SavedAlbumCard = ({ link, albumArt, albumTitle, yearReleased, artistName, removeAlbum, artistID, albumID, saveAlbum, previouslyLikedSongs }) => {

    const history = useHistory();
    
    let albumObject = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID};

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

    const fetchAlbumData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/album/${albumID}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const albumData = await response.json();

            setAlbumData(albumData);
            // setTrackData(trackData);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const addLikedSong = likedSong => {
        if (!likedSongs.some(song => song.trackID === likedSong.trackID)) {
            setLikedSongs([...likedSongs, likedSong]);
        }
    }

    const removeLikedSong = unLikedSong => {
        setLikedSongs(likedSongs.filter(song => song.trackID !== unLikedSong.trackID));
    }

    const submitAlbum = () => {
        albumObject.likedSongs = JSON.stringify(likedSongs);
        saveAlbum(albumObject);
        toggleSongModal();
    }

    const replaceAlbum = async () => {
        const result = await removeAlbum({ link });
        if (result === 'Successfully removed') {
            submitAlbum();
        } else {
            console.log('Something went wrong');
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
    
    const handleHeartIconClick = () => {
        if (songModalActive) {
            toggleSongModal();
        } else {
            setShowDropDown(!showDropDown);
        }
    }

    const showSongs = () => {
        toggleSongModal();
        setShowDropDown(false);
        if (Object.keys(albumData).length === 0 && !startedFetch) {
            setStartedFetch(true);
            fetchAlbumData();
        }
    }

    useEffect(() => {
        setLikedSongs(previouslyLikedSongs); 
     }, []);

    return (
        <div className="album-card-wrapper">
            <div className="album-card" id={link}>
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
                        <h2 onClick={() => history.push(`/album/${albumID}`)} className="album-title">{albumTitle}</h2>
                    </div>
                    <img 
                        className="heart-icon"
                        src={likedIcon} 
                        onClick={handleHeartIconClick}
                    />
                </div>
                <div 
                    className="details-container"
                    style={{ top: albumDetailsTop }}  
                >
                    <p className="album-details">{yearReleased} • <span className="saved-album-artist-link" onClick={() => history.push(`/artist/${artistID}`)}>{artistName}</span></p>
                </div>
                <div 
                    className="song-modal-container"
                    style={songModalStyle}
                >
                    {loading && <LoadingSongModal />}
                    {!loading && 
                        <SongModal 
                            albumData={albumData} 
                            replaceAlbum={replaceAlbum}
                            addLikedSong={addLikedSong} 
                            removeLikedSong={removeLikedSong}
                            likedSongs={likedSongs}
                            albumIsLiked={true}
                        />}
                </div>
            </div>
            {showDropDown &&
                <div className="remove-edit-menu">
                    <div 
                        className="remove-edit-menu-button"
                        onClick={showSongs}
                    >Edit album</div>
                    <div 
                        className="remove-edit-menu-button"
                        onClick={() => removeAlbum({ link })}
                    >Remove album</div>
                </div>        
            }
        </div>
    )
}

export default SavedAlbumCard;