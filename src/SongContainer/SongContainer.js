import React, { useEffect, useState } from "react";
import './SongContainer.css';

import SongCard from "../SongCard/SongCard";

import clockIcon from '../assets/clock-icon.png';

const SongContainer = ({ 
    albumData, addLikedSong, removeLikedSong, previouslyLikedSongs, likedSongs, totalStreams, lowestStreams, 
    loadingSinglesData, totalStreamsWithoutSingles, lowestStreamsWithoutSingles, albumHasSingles, singlesByArtist,
    displayInfoModal, singlesDataCalculated
}) => {

    const [withoutSingles, setWithoutSingles] = useState(false);
    const [buttonMessage, setButtonMessage] = useState('Show without singles');
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        if (buttonMessage === 'No singles') {
            return;
        }
        if (!withoutSingles) {
            setButtonMessage('Show without singles');
        } else {    
            setButtonMessage('Show with singles');
        }
    }, [withoutSingles]);

    useEffect(() => {
        if (singlesDataCalculated && !albumHasSingles) {
            if (withoutSingles) {
                displayInfoModal(`No singles released for this album`);
            }
            setWithoutSingles(false);
            setButtonMessage('No singles');
            setDisableButton(true);
        }
    }, [singlesDataCalculated]);

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

        if (totalStreams == song.track.playcount) {
            specialCase = 'Highest';
        } else if (lowestStreams == song.track.playcount) {
            specialCase = 'Lowest';
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
                albumHasSingles={albumHasSingles}
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
                    onClick={() => {
                        if (loadingSinglesData) {
                            setWithoutSingles(!withoutSingles)
                        } else {
                            if (albumHasSingles) {
                                setWithoutSingles(!withoutSingles)
                            } else {
                                displayInfoModal(`No singles released for this album`);
                            }
                        }
                    }}
                    disabled={disableButton}
                >{buttonMessage}</button>
                <img className="clock-icon" src={clockIcon} />
            </div>
            {SongCards}
        </div>
    )
}

export default SongContainer;