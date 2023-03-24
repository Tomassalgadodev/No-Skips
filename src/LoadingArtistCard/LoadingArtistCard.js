import React from "react";
import './LoadingArtistCard.css';

const LoadingArtistCard = () => {
    return (
        <div className="artist-card">
            <div className="artist-content-box">
                <div className="fake-artist-thumbnail"></div>
                <div className="fake-artist-name"></div>
                <div className="fake-artist-tag"></div>
            </div>
        </div>
    )
}

export default LoadingArtistCard;