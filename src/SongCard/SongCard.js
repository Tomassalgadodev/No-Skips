import React, { Component } from "react";
import'./SongCard.css';

import ArtistLink from "../ArtistLink/ArtistLink";

import likedIcon from '../assets/liked_icon.png';
import unlikedIcon from '../assets/unliked_icon.png';
import whiteUnlikedIcon from '../assets/unliked_white_icon.png';

const SongCard = ({ trackNumber, trackName, trackArtists, numberOfStreams, trackLength }) => {

    const artistLinks = trackArtists.map((artist, index) => {

        const artistID = artist.uri.split(':').pop();

        return (
            <ArtistLink 
                artistName={artist.profile.name}
                artistID={artistID}
                key={index}
            />
        )
    }).flatMap((component, index) => trackArtists.length - 1 === index ? [component] : [component, ', '])

    return (
        <div>
            <p>{trackNumber}</p>
            <div>
                <p>{trackName}</p>
                <p>
                    {artistLinks}
                </p>
            </div>
            <img src={unlikedIcon} />
            <p>{trackLength}</p>
        </div>
    )
}

export default SongCard;