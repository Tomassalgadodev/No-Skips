import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './AlbumDetailsHeader.css';

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const AlbumDetailsHeader = ({ 
    albumImage, 
    albumTitle, 
    artistThumbnail, 
    artistName, 
    artistID, 
    albumType, 
    numberOfSongs, 
    albumLength, 
    backgroundColor, 
    yearReleased, 
    albumIsLiked, 
    likeAllSongs, 
    removeAllSongs, 
    handleRemoveAlbum, 
    submitAlbumWithTracks,
    displayInfoModal
}) => {

    const [mainHeartIcon, setMainHeartIcon] = useState(unlikedIcon);
    const [showAlbumSubmitMessage, setShowAlbumSubmitMessage] = useState(true);
    const [fontSize, setFontSize] = useState(6);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [firstBreakPoint, setFirstBreakPoint] = useState([]);
    const [secondBreakPoint, setSecondBreakPoint] = useState([]);
    const [thirdBreakPoint, setThirdBreakPoint] = useState([]);
    const [useWordWrap, setUseWordWrap] = useState(false);

    const history = useHistory();

    const handleLikeAllSongs = async () => {
        if (mainHeartIcon !== likedIcon) {
            const allSongs = await likeAllSongs();
            const result = await submitAlbumWithTracks(allSongs);
            if (result === 'Success!') {
                displayInfoModal('Album added to your collection');
            }
        } else {
            removeAllSongs();
            setShowAlbumSubmitMessage(false);
            setMainHeartIcon(unlikedIcon);
        }
    }

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 600) {
            const contentContainer = document.querySelector('.album-details-content-container');
            const titleContainer = document.querySelector('.album-details-title');
            const containerWidth = contentContainer.clientWidth - 320;
            const titleWidth = titleContainer.scrollWidth;

            if (firstBreakPoint.length && window.innerWidth > firstBreakPoint[0]) {
                setFontSize(firstBreakPoint[1]);
            } else if (secondBreakPoint.length && window.innerWidth > secondBreakPoint[0]) {
                setFontSize(secondBreakPoint[1]);
            } else if (thirdBreakPoint.length && window.innerWidth > thirdBreakPoint[0]) {
                setFontSize(thirdBreakPoint[1]);
            }

            if (titleWidth >= containerWidth && fontSize !== 1.5) {
                if (!firstBreakPoint.length) {
                    setFirstBreakPoint([window.innerWidth + 20, fontSize]);
                } else if (!secondBreakPoint.length) {
                    setSecondBreakPoint([window.innerWidth + 20, fontSize]);
                } else if (!thirdBreakPoint.length) {
                    setThirdBreakPoint([window.innerWidth + 20, fontSize]);
                }
                setFontSize(fontSize - 1.5);
            }
            
            if (fontSize === 1.5) {
                setUseWordWrap(true);
            } else {
                setUseWordWrap(false);
            }
        } else {
            setFontSize(1.5);
        }
        
    }, [windowWidth, fontSize]);

    return (
        <div style={{ backgroundColor: backgroundColor }} className="album-details-header">
            <div className="album-details-content-container">
                <div className="album-details-image-container">
                    <img className="album-details-image" src={albumImage} />
                </div>
                <div className="album-details-wrapper">
                    <div className="album-details-container">
                        <p className="album-type">{albumType}</p>
                        <p 
                            style={{ fontSize: `${fontSize}rem` }} 
                            className={useWordWrap ? "album-details-title use-wrap" : "album-details-title"}
                        >{albumTitle}</p>
                        <div className="album-details-subheading-container">
                            <img className="album-details-artist-thumbnail" src={artistThumbnail} />
                            <p className="album-details-subheading">
                                <span 
                                    onClick={() => history.push(`/artist/${artistID}`)} 
                                    className="album-details-artist-link"
                                >{artistName}</span>
                                    {windowWidth <= 600 ? '' : ' •'}
                                <span className="sub-details">{' ' + yearReleased + ' • ' + numberOfSongs + ' Songs'}</span> 
                            </p>
                            {!albumIsLiked &&
                                <img 
                                    className="album-heart-icon" 
                                    onMouseOver={() => mainHeartIcon !== likedIcon ? setMainHeartIcon(whiteUnlikedIcon) : ''}
                                    onMouseOut={() => mainHeartIcon !== likedIcon ? setMainHeartIcon(unlikedIcon) : ''}
                                    onClick={handleLikeAllSongs}
                                    src={mainHeartIcon} 
                                />
                            }
                            {albumIsLiked && 
                                <img 
                                    className="album-heart-icon"
                                    src={likedIcon}
                                    onClick={() => {
                                        handleRemoveAlbum();
                                        setMainHeartIcon(unlikedIcon);
                                    }}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="tint"></div>
        </div>
    )
}

export default AlbumDetailsHeader;