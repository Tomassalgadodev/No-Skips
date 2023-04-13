import React from "react";
import './LoadingAlbumCard.css';

const LoadingAlbumCard = () => {
    return (
        <div className="fake-album-card">
            <div className="fake-album-image"></div>
            <div className="fake-album-title-container">
                <div className="fake-album-title"></div>
            </div>
            <div className="fake-album-details-container">
                <div className="fake-album-details"></div>
            </div>
        </div>
    )
}

export default LoadingAlbumCard;