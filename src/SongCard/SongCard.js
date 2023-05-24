import React, { Component, useEffect, useState } from "react";
import'./SongCard.css';

import ArtistLink from "../ArtistLink/ArtistLink";

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const SongCard = ({ 
    trackID, 
    trackNumber, 
    trackName, 
    trackArtists, 
    numberOfStreams, 
    trackLength, 
    addLikedSong, 
    removeLikedSong, 
    songIsLiked, 
    likedSongs, 
    percentSkipped, 
    specialCase, 
    withoutSingles, 
    percentSkippedWithoutSingles, 
    songIsASingle, 
    specialCaseWithoutSingles,
    albumHasSingles, 
    loadingStreamingData,
    index
}) => {

    const [unlikedVisibility, setUnlikedVisbility] = useState(false);
    const [unlikedHeart, setUnlikedHeart] = useState(unlikedIcon);
    const [isLiked, setIsLiked] = useState(false);
    const [artistLinkColor, setArtistLinkColor] = useState('#B3B3B3');
    const [percentSkippedColor, setPercentSkippedColor] = useState('green');
    const [playCount, setPlayCount] = useState('');
    const [showPlayCount, setShowPlayCount] = useState(false);
    const [percentSkippedColorWithoutSingles, setPercentSkippedColorWithoutSingles] = useState('green'); 
    const [firstBreakPoint, setFirstBreakPoint] = useState(false);
    const [skipTag, setSkipTag] = useState('Loading');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [titleContainerWidth, setTitleContainerWidth] = useState('auto');

    const artistLinks = trackArtists.map((artist, index) => {

        return (
            <ArtistLink 
                artistName={artist.name}
                artistID={artist.id}
                key={index}
            />
        )
    }).flatMap((component, index) => trackArtists.length - 1 === index ? [component] : [component, ', ']);

    const setHoverState = () => {
        if (!isLiked && screenWidth > 1000) {
            setUnlikedVisbility(true);
        }
        setArtistLinkColor('#fff');
    }

    const unSetHoverState = () => {
        if (!isLiked && screenWidth > 1000) {
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
        let color;

        if (percent === '0.0') {
            color = '#25b338';
        } else {
            const value = parseFloat(percent) / 100;
            const hue = ((1.07 - value) * 120).toString(10);
            color = ["hsl(", hue, ",100%,60%)"].join("");
        }
        setPercentSkippedColor(color);
    }

    const getPercentSkippedColorWithoutSingles = percent => {
        let color;

        if (percent === '0.0') {
            color = '#25b338';
        } else {
            const value = parseFloat(percent) / 100;
            const hue = ((1.07 - value) * 120).toString(10);
            color = ["hsl(", hue, ",100%,60%)"].join("");
        }
        setPercentSkippedColorWithoutSingles(color);
    }

    const getPlayCount = () => {
        const plays = parseInt(numberOfStreams).toLocaleString('en-US');
        setPlayCount(plays);
    }

    useEffect(() => {
        if (songIsLiked) {
            setIsLiked(true);
        }

        const handleResize = () => {
            const firstBreakPointQuery = window.matchMedia('(max-width: 600px)');
            setFirstBreakPoint(firstBreakPointQuery.matches);
            setScreenWidth(window.innerWidth);
        };

        const checkCollision = () => {
            const percentSkippedContainer = document.querySelector('.percent-streamed-container');
            const loadingPercentSkippedContainer = document.querySelector('.loading-percent-streamed-container');
            let cutOffGuide;

            if (percentSkippedContainer) {
                cutOffGuide = percentSkippedContainer.getBoundingClientRect();
            } else {
                cutOffGuide = loadingPercentSkippedContainer.getBoundingClientRect();
            }

            if (window.innerWidth > 1000) {
                setTitleContainerWidth(`${cutOffGuide.left - 100}px`);
            } else if (window.innerWidth > 600) {
                setTitleContainerWidth(`${cutOffGuide.left - 150}px`);
            } else {
                setTitleContainerWidth(`${cutOffGuide.left - 130}px`)
            }
        }

        handleResize();
        checkCollision();

        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', checkCollision);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', checkCollision);
        };
    }, []);

    useEffect(() => {
        if (!loadingStreamingData) {
            getPercentSkippedColor(percentSkipped);
            getPlayCount();
        }
    }, [loadingStreamingData]);

    useEffect(() => {
        if (!loadingStreamingData) {
            getPercentSkippedColorWithoutSingles(percentSkippedWithoutSingles);
        }
    }, [percentSkippedWithoutSingles]);

    useEffect(() => {
        if (likedSongs.some(song => song.trackID === trackID)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
            setUnlikedVisbility(false);
            setUnlikedHeart(unlikedHeart);
        }
    }, [likedSongs]);

    useEffect(() => {
        if (!firstBreakPoint) {
            if (specialCase === 'Highest') {
                setSkipTag('Most streamed');
            } else if (specialCase === 'Lowest') {
                setSkipTag('Least streamed');
            } else {
                setSkipTag(percentSkipped + '% skip rate');
            }
        } else if (firstBreakPoint) {
            setSkipTag('')
        }

    }, [specialCase, percentSkipped, firstBreakPoint]);

    useEffect(() => {

    }, []);

    return (
        <div
            onMouseOver={setHoverState}
            onMouseOut={unSetHoverState}
            className="song-card"
        >
            <p className="track-number">{trackNumber}</p>
            <div className="song-details-container">
                <p 
                    className="track-name"
                    style={{ width: titleContainerWidth }}
                    >{trackName}</p>
                <p 
                    className="artist-links" 
                    style={{ color: artistLinkColor, width: titleContainerWidth }}
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
            {screenWidth <= 1000 && 
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
            {!withoutSingles && !loadingStreamingData &&
                <div className="percent-streamed-container" 
                    style={{ backgroundColor: percentSkippedColor }}
                    onMouseOver={() => setShowPlayCount(true)}
                    onMouseOut={() => setShowPlayCount(false)}
                >   
                    {skipTag}
                </div>
            }
            {loadingStreamingData &&
                <div 
                    className="loading-percent-streamed-container" 
                    style={{ backgroundColor: '#b3b3b3' }}
                ></div>
            }
            {withoutSingles && albumHasSingles && !loadingStreamingData &&
                <div className="percent-streamed-container" 
                    style={songIsASingle ? { backgroundColor: '', color: '#b3b3b3', border: '1px solid #b3b3b3', boxSizing: 'border-box' } : { backgroundColor: percentSkippedColorWithoutSingles }}
                    onMouseOver={() => setShowPlayCount(true)}
                    onMouseOut={() => setShowPlayCount(false)}
                >   
                    {songIsASingle ? 
                        'Single release' : specialCaseWithoutSingles === 'highestWithoutSingles' ? 
                        'Most streamed' : specialCaseWithoutSingles === 'lowestWithoutSingles' ? 
                        'Least streamed' : `${percentSkippedWithoutSingles}% skip rate`}
                </div>
            }
            <p className="track-length">{trackLength}</p>
            {showPlayCount &&
                <div className="play-count">{`${playCount} plays`}</div>        
            }
        </div>
    )
}

export default SongCard;