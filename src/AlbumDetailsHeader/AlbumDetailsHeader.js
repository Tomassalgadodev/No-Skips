import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './AlbumDetailsHeader.css';

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const AlbumDetailsHeader = ({ 
    albumImage, albumTitle, artistThumbnail, artistName, artistID, albumType, 
    numberOfSongs, albumLength, backgroundColor, yearReleased, albumIsLiked, 
    likeAllSongs, removeAllSongs, handleRemoveAlbum, submitAlbumWithTracks 
}) => {

    const [mainHeartIcon, setMainHeartIcon] = useState(unlikedIcon);

    const history = useHistory();

    const handleLikeAllSongs = async () => {
        if (mainHeartIcon !== likedIcon) {
            const allSongs = await likeAllSongs();
            setMainHeartIcon(likedIcon);
            submitAlbumWithTracks(allSongs);
        } else {
            removeAllSongs();
            setMainHeartIcon(unlikedIcon);
        }
    }

    return (
        <div style={{ backgroundColor: backgroundColor }} className="album-details-header">
            <div className="album-details-content-container">
                <div className="album-details-image-container">
                    <img className="album-details-image" src={albumImage} />
                </div>
                <div className="album-details-wrapper">
                    <div className="album-details-container">
                        <p className="album-type">{albumType}</p>
                        <p className="album-details-title">{albumTitle}</p>
                        <div className="album-details-subheading-container">
                            <img className="album-details-artist-thumbnail" src={artistThumbnail} />
                            <p className="album-details-subheading">
                                <span 
                                    onClick={() => history.push(`/artist/${artistID}`)} 
                                    className="album-details-artist-link"
                                >{artistName}</span> • 
                                <span>{yearReleased}</span> • 
                                <span>{numberOfSongs} Songs</span>
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