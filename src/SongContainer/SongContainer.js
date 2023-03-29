import React from "react";
import './SongContainer.css';

import SongCard from "../SongCard/SongCard";

const SongContainer = ({ trackData }) => {

    const SongCards = trackData.data.albumUnion.tracks.items.map((song, index) => {

        let trackLength = '';
        trackLength += Math.floor(song.track.duration.totalMilliseconds / 60000);
        trackLength += ':';
        trackLength += Math.floor((song.track.duration.totalMilliseconds % 60000) / 1000);

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
    })


    return (
        <div>
            <div>
                <p>#</p>
                <p>Title</p>
                <p>Clock Icon</p>
            </div>
            {SongCards}
        </div>
    )
}

export default SongContainer;