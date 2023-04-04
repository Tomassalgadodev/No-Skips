import React from "react";
import './LoadingSongModal.css';

import unlikedIcon from '../assets/unliked_icon.png';

const LoadingSongModal = () => {
    return (
        <React.Fragment>
            <div className="mini-song-container-heading">
                <p className="hash">#</p>
                <p className="title">Title</p>
            </div>
            <div className="mini-song-card">
                <div className="mini-track-number-container">
                    <p className="mini-track-number">1</p>
                </div>
                <div className="loading-mini-track-name-container"></div>
                <img 
                    className="loading-mini-song-heart-icon" 
                    src={unlikedIcon}
                />
            </div>
            <div className="mini-song-card">
                <div className="mini-track-number-container">
                    <p className="mini-track-number">2</p>
                </div>
                <div className="loading-mini-track-name-container"></div>
                <img 
                    className="loading-mini-song-heart-icon" 
                    src={unlikedIcon}
                />
            </div>
            <div className="mini-song-card">
                <div className="mini-track-number-container">
                    <p className="mini-track-number">3</p>
                </div>
                <div className="loading-mini-track-name-container"></div>
                <img 
                    className="loading-mini-song-heart-icon" 
                    src={unlikedIcon}
                />
            </div>
            <div className="mini-song-card">
                <div className="mini-track-number-container">
                    <p className="mini-track-number">4</p>
                </div>
                <div className="loading-mini-track-name-container"></div>
                <img 
                    className="loading-mini-song-heart-icon" 
                    src={unlikedIcon}
                />
            </div>
            <div className="mini-song-card">
                <div className="mini-track-number-container">
                    <p className="mini-track-number">5</p>
                </div>
                <div className="loading-mini-track-name-container"></div>
                <img 
                    className="loading-mini-song-heart-icon" 
                    src={unlikedIcon}
                />
            </div>
        </React.Fragment>
    )
}

export default LoadingSongModal;