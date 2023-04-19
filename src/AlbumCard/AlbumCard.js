import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './AlbumCard.css';

import SongModal from "../SongModal/SongModal";
import LoadingSongModal from "../LoadingSongModal/LoadingSongModal";

import likedIcon from '../assets/liked_icon.png';
import greyPlusIcon from '../assets/grey-plus-icon.png';
import whitePlusIcon from '../assets/white-plus-icon.png';
import greyMinusIcon from '../assets/grey-minus-icon.png';
import whiteMinusIcon from '../assets/white-minus-icon.png';

import { getSingleAlbumData } from "../fetchRequests";

const AlbumCard = ({ albumArt, albumTitle, yearReleased, link, isLiked, artistName, artistID, saveAlbum, removeAlbum, albumID, liked, previouslyLikedSongs, spotifyAccessToken }) => {

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
    const [albumColor, setAlbumColor] = useState('');
    const [likedSongs, setLikedSongs] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);

    const history = useHistory();

    let albumObject = { albumArt, albumTitle, yearReleased, link, artistName, artistID, albumID };

    const getAverageColor = (image) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const { width, height } = image;
        let r = 0;
        let g = 0;
        let b = 0;
      
        canvas.width = width;
        canvas.height = height;
      
        context.drawImage(image, 0, 0, width, height);
      
        const imageData = context.getImageData(0, 0, width, height);
        const data = imageData.data;
      
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
      
        const pixels = data.length / 4;
        const avgR = r / pixels;
        const avgG = g / pixels;
        const avgB = b / pixels;
      
        return `rgb(${avgR}, ${avgG}, ${avgB})`;
      }

    const getAlbumColor = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            await new Promise((resolve) => (img.onload = resolve));
            const avgColor = getAverageColor(img);
            return avgColor;
          } catch (error) {
            console.error(error);
          }
    }

    const fetchAlbumData = async () => {
        try {
            const data = await getSingleAlbumData(albumID, spotifyAccessToken);

            if (typeof data === 'string') {
                throw new Error(data);
            }

            const albumImage = data.images[2].url;
            const albumColorHex = await getAlbumColor(albumImage);

            setAlbumColor(albumColorHex);
            setAlbumData(data);
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

    const submitAlbum = async () => {
        albumObject.likedSongs = JSON.stringify(likedSongs);
        const result = await saveAlbum([albumObject, albumColor]);
        if (result !== 'Logged out') { toggleSongModal(); }
    }

    const replaceAlbum = async () => {
        const result = await removeAlbum({ link });
        if (result === 'Successfully removed') {
            submitAlbum();
        } else {
            console.log('Something went wrong');
        }
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

    const handleRemoveAlbum = () => {
        removeAlbum({ link });
        // If successful run the below code
        setLikedSongs([]);
        setShowDropDown(false);
    }

    useEffect(() => {
        if (previouslyLikedSongs) {
            console.log(previouslyLikedSongs);
            setLikedSongs(previouslyLikedSongs);
        }
    }, [previouslyLikedSongs]);

    return (
        <div className="album-card-wrapper">
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
                        onClick={showSongs}
                        onMouseOver={highlightHeartIcon}
                        onMouseOut={unhighlightHeartIcon}
                    />}
                    {isLiked &&
                        <img 
                            className={'heart-icon'}
                            src={likedIcon} 
                            onClick={handleHeartIconClick}
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
                    {loading && <LoadingSongModal />}
                    {!loading && 
                        <SongModal 
                            albumData={albumData} 
                            submitAlbum={submitAlbum} 
                            replaceAlbum={replaceAlbum}
                            addLikedSong={addLikedSong} 
                            removeLikedSong={removeLikedSong}
                            albumIsLiked={isLiked}
                            likedSongs={likedSongs}
                        />}
                </div>
            </div>
            {showDropDown &&
                <div 
                    className="remove-edit-menu"
                    onMouseLeave={() => setShowDropDown(false)}
                >
                    <div 
                        className="remove-edit-menu-button"
                        onClick={showSongs}
                    >Edit album</div>
                    <div 
                        className="remove-edit-menu-button"
                        onClick={handleRemoveAlbum}
                    >Remove album</div>
                </div>        
            }
        </div>
    )
}

export default AlbumCard;