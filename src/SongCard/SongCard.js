import React, { Component, useState } from "react";
import'./SongCard.css';

import ArtistLink from "../ArtistLink/ArtistLink";

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const SongCard = ({ trackNumber, trackName, trackArtists, numberOfStreams, trackLength }) => {

    const [unlikedVisibility, setUnlikedVisbility] = useState(false);
    const [unlikedHeart, setUnlikedHeart] = useState(unlikedIcon);
    const [isLiked, setIsLiked] = useState(false);

    const artistLinks = trackArtists.map((artist, index) => {

        const artistID = artist.uri.split(':').pop();

        return (
            <ArtistLink 
                artistName={artist.profile.name}
                artistID={artistID}
                key={index}
            />
        )
    }).flatMap((component, index) => trackArtists.length - 1 === index ? [component] : [component, ', ']);

    const showHeartIcon = () => {
        if (!isLiked) {
            setUnlikedVisbility(true);
        }
    }

    const hideHeartIcon = () => {
        if (!isLiked) {
            setUnlikedVisbility(false);
        }
    }

    const highlightHeartIcon = () => {
        if (!isLiked) {
            setUnlikedHeart(whiteUnlikedIcon);
        }
    }

    const unhighlightHeartIcon = () => {
        if (!isLiked) {
            setUnlikedHeart(unlikedIcon);
        }
    }

    return (
        <div
            onMouseOver={showHeartIcon}
            onMouseOut={hideHeartIcon}
            className="song-card"
        >
            <p className="track-number">{trackNumber}</p>
            <div className="song-details-container">
                <p className="track-name">{trackName}</p>
                <p className="artist-links">
                    {artistLinks}
                </p>
            </div>
            {unlikedVisibility && 
                <img 
                    className="song-heart-icon" 
                    src={unlikedHeart} 
                    onMouseOver={highlightHeartIcon}
                    onMouseOut={unhighlightHeartIcon}
                />}
            <p className="track-length">{trackLength}</p>
        </div>
    )
}

export default SongCard;