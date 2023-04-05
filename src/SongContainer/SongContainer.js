import React, { useState } from "react";
import './SongContainer.css';

import SongCard from "../SongCard/SongCard";

import clockIcon from '../assets/clock-icon.png';

const SongContainer = ({ 
    albumData, addLikedSong, removeLikedSong, previouslyLikedSongs, likedSongs, totalStreams, lowestStreams, 
    loadingSinglesData, totalStreamsWithoutSingles, lowestStreamsWithoutSingles, albumHasSingles, singlesByArtist
}) => {

    const [withoutSingles, setWithoutSingles] = useState(false);

    const SongCards = albumData.data.albumUnion.tracks.items.map((song, index) => {

        let trackLength = '';
        trackLength += Math.floor(song.track.duration.totalMilliseconds / 60000);
        trackLength += ':';
        trackLength += Math.floor((song.track.duration.totalMilliseconds % 60000) / 1000);
        if (trackLength.length === 3) trackLength = trackLength.slice(0, 2) + '0' + trackLength.substring(2);

        let songIsLiked = false;

        if (previouslyLikedSongs) {
            songIsLiked = previouslyLikedSongs.some(likedSong => likedSong.trackID === song.uid);
        }

        let specialCase;

        if (lowestStreams == song.track.playcount) {
            specialCase = 'Lowest';
        } else if (totalStreams == song.track.playcount) {
            specialCase = 'Highest'
        } 

        let songIsASingle = false;
        let specialCaseWithoutSingles;

        if (albumHasSingles) {
            if (lowestStreamsWithoutSingles == song.track.playcount) {
                specialCaseWithoutSingles = 'lowestWithoutSingles';
            } else if (totalStreamsWithoutSingles == song.track.playcount) {
                specialCaseWithoutSingles = 'highestWithoutSingles';
            }

            if (singlesByArtist.includes(song.track.name)) {
                songIsASingle = true;
            }
        }


        const percentSkipped = ((1 - ((parseInt(song.track.playcount) / totalStreams))) * 100).toFixed(1);

        const percentSkippedWithoutSingles = ((1 - ((parseInt(song.track.playcount) / totalStreamsWithoutSingles))) * 100).toFixed(1);


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
                likedSongs={likedSongs}
                percentSkipped={percentSkipped}
                specialCase={specialCase}
                loadingSinglesData={loadingSinglesData}
                withoutSingles={withoutSingles}
                percentSkippedWithoutSingles={percentSkippedWithoutSingles}
                songIsASingle={songIsASingle}
                specialCaseWithoutSingles={specialCaseWithoutSingles}
            />
        )
    });


    return (
        <div className="song-container">
            <div className="song-container-heading">
                <p className="hash">#</p>
                <p className="title">Title</p>
                <button 
                    className="omit-singles-button"
                    onClick={() => setWithoutSingles(!withoutSingles)}
                >Omit singles</button>
                <img className="clock-icon" src={clockIcon} />
            </div>
            {SongCards}
        </div>
    )
}

export default SongContainer;