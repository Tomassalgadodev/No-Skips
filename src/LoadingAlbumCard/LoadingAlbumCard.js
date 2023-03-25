import React from "react";
import './LoadingAlbumCard.css';

const LoadingAlbumCard = () => {
    return (
        <div className="fake-album-card">
            <div className="fake-album-image"></div>
            <div className="title-container">
                <div className="fake-album-title"></div>
            </div>
            <div className="details-container">
                <div className="fake-album-details"></div>
            </div>
        </div>
    )
}

export default LoadingAlbumCard;