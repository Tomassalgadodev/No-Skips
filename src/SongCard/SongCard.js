import React, { Component, useEffect, useState } from "react";
import'./SongCard.css';

import ArtistLink from "../ArtistLink/ArtistLink";

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const SongCard = ({ trackID, trackNumber, trackName, trackArtists, numberOfStreams, trackLength, addLikedSong, removeLikedSong, songIsLiked, likedSongs, percentSkipped, specialCase }) => {

    const [unlikedVisibility, setUnlikedVisbility] = useState(false);
    const [unlikedHeart, setUnlikedHeart] = useState(unlikedIcon);
    const [isLiked, setIsLiked] = useState(false);
    const [artistLinkColor, setArtistLinkColor] = useState('#B3B3B3');
    const [percentSkippedColor, setPercentSkippedColor] = useState('green');
    const [playCount, setPlayCount] = useState('');
    const [showPlayCount, setShowPlayCount] = useState(false);

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

    const setHoverState = () => {
        if (!isLiked) {
            setUnlikedVisbility(true);
        }
        setArtistLinkColor('#fff');
    }

    const unSetHoverState = () => {
        if (!isLiked) {
            setUnlikedVisbility(false);
        }
        setArtistLinkColor('#B3B3B3');
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

    const toggleSong = () => {
        if (!isLiked) {
            addLikedSong({ trackNumber, trackName, trackID });
            setIsLiked(true);
        } else {
            removeLikedSong({ trackNumber, trackName, trackID });
            setIsLiked(false);
        }
    }

    const getPercentSkippedColor = percent => {
        const value = parseFloat(percent) / 100;
        const hue = ((1.07 - value) * 120).toString(10);
        const color = ["hsl(", hue, ",100%,60%)"].join("");
        setPercentSkippedColor(color);
    }

    const getPlayCount = () => {
        const plays = parseInt(numberOfStreams).toLocaleString('en-US');
        setPlayCount(plays);
    }

    useEffect(() => {
        if (songIsLiked) {
            setIsLiked(true);
        }
        
        getPercentSkippedColor(percentSkipped);
        getPlayCount();

    }, []);

    useEffect(() => {
        if (likedSongs.some(song => song.trackID === trackID)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
            setUnlikedVisbility(false);
            setUnlikedHeart(unlikedHeart);
        }
    }, [likedSongs]);

    return (
        <div
            onMouseOver={setHoverState}
            onMouseOut={unSetHoverState}
            className="song-card"
        >
            <p className="track-number">{trackNumber}</p>
            <div className="song-details-container">
                <p className="track-name">{trackName}</p>
                <p 
                    className="artist-links" 
                    style={{ color: artistLinkColor }}
                >
                    {artistLinks}
                </p>
            </div>
            {unlikedVisibility && 
                <img 
                    className="song-heart-icon" 
                    src={unlikedHeart} 
                    onMouseOver={highlightHeartIcon}
                    onMouseOut={unhighlightHeartIcon}
                    onClick={toggleSong}
                />
            }
            {isLiked &&
                <img
                    className="song-heart-icon" 
                    src={likedIcon} 
                    onClick={toggleSong} 
                />
            }
            <div className="percent-streamed-container" 
                style={{ backgroundColor: percentSkippedColor }}
                onMouseOver={() => setShowPlayCount(true)}
                onMouseOut={() => setShowPlayCount(false)}
            >   
                {specialCase === 'Highest' ? 'Most streamed' : specialCase === 'Lowest' ? 'Least streamed' : `${percentSkipped}% skip rate`}
            </div>
            <p className="track-length">{trackLength}</p>
            {showPlayCount &&
                <div className="play-count">{`${playCount} plays`}</div>        
            }
        </div>
    )
}

export default SongCard;