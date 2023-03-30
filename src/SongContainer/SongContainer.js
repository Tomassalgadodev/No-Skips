import React from "react";
import './SongContainer.css';

import SongCard from "../SongCard/SongCard";

import clockIcon from '../assets/clock-icon.png';

const SongContainer = ({ trackData }) => {

    const SongCards = trackData.data.albumUnion.tracks.items.map((song, index) => {

        let trackLength = '';
        trackLength += Math.floor(song.track.duration.totalMilliseconds / 60000);
        trackLength += ':';
        trackLength += Math.floor((song.track.duration.totalMilliseconds % 60000) / 1000);
        if (trackLength.length === 3) trackLength = trackLength.slice(0, 2) + '0' + trackLength.substring(2);

        return (
            <SongCard 
                key={index}
                trackNumber={song.track.trackNumber}
                trackName={song.track.name}
                numberOfStreams={song.track.playcount}
                trackLength={trackLength}
                trackArtists={song.track.artists.items}
            />
        )
    });


    return (
        <div className="song-container">
            <div className="song-container-heading">
                <p className="hash">#</p>
                <p className="title">Title</p>
                <img className="clock-icon" src={clockIcon} />
            </div>
            {SongCards}
        </div>
    )
}

export default SongContainer;