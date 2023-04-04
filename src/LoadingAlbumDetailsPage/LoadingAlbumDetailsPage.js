import React from "react";
import './LoadingAlbumDetailsPage.css';

import clockIcon from '../assets/clock-icon.png';
import unlikedIcon from '../assets/unliked_icon.png';

const LoadingAlbumDetailsPage = () => {
    return (
        <React.Fragment>
            <div className="loading-album-details-header">
                <div className="loading-album-details-content-container">
                    <div className="loading-album-details-image-container">
                        <div className="loading-album-details-image"></div>
                    </div>
                </div>
            </div>
            <div className="song-container">
                <div className="song-container-heading">
                    <p className="hash">#</p>
                    <p className="title">Title</p>
                    <img className="clock-icon" src={clockIcon} />
                </div>
                <div className="song-card">
                    <p className="track-number">1</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">2</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">3</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">4</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">5</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">6</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">7</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">8</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
                <div className="song-card">
                    <p className="track-number">9</p>
                    <div className="song-details-container">
                        <div className="loading-track-name"></div>
                        <div className="loading-artist-links"></div>
                    </div>
                    <img className="song-heart-icon" src={unlikedIcon}/>
                    <div className="loading-track-length"></div>
                </div>
            </div>
            <div className="album-submit-button-container">
                <button className="album-submit-button">Submit album</button>
            </div>
        </React.Fragment>
    )
}

export default LoadingAlbumDetailsPage;