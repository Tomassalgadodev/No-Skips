import React from "react";
import './SongContainer.css';

import SongCard from "../SongCard/SongCard";

import clockIcon from '../assets/clock-icon.png';

const SongContainer = ({ trackData, addLikedSong, removeLikedSong, previouslyLikedSongs }) => {

    const SongCards = trackData.data.albumUnion.tracks.items.map((song, index) => {

        let trackLength = '';
        trackLength += Math.floor(song.track.duration.totalMilliseconds / 60000);
        trackLength += ':';
        trackLength += Math.floor((song.track.duration.totalMilliseconds % 60000) / 1000);
        if (trackLength.length === 3) trackLength = trackLength.slice(0, 2) + '0' + trackLength.substring(2);

        let songIsLiked = false;

        if (previouslyLikedSongs) {
            songIsLiked = previouslyLikedSongs.some(likedSong => likedSong.trackName === song.track.name && likedSong.trackNumber === song.track.trackNumber);
        }

        return (
            <SongCard 
                key={index}
                trackID={song.uid}
                trackNumber={song.track.trackNumber}
                trackName={song.track.name}
                numberOfStreams={song.track.playcount}
                trackLength={trackLength}
                trackArtists={song.track.artists.items}
                addLikedSong={addLikedSong}
                removeLikedSong={removeLikedSong}
                songIsLiked={songIsLiked}
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