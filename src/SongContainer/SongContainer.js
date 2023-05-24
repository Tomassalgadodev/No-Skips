import React, { useEffect, useState } from "react";
import './SongContainer.css';

import SongCard from "../SongCard/SongCard";

import clockIcon from '../assets/clock-icon.png';

const SongContainer = ({ 
    albumData, 
    addLikedSong, 
    removeLikedSong, 
    previouslyLikedSongs, 
    likedSongs, 
    loadingStreamingData, 
    totalStreams, 
    lowestStreams, 
    loadingSinglesData, 
    totalStreamsWithoutSingles, 
    lowestStreamsWithoutSingles, 
    albumHasSingles, 
    singlesByArtist,
    displayInfoModal, 
    singlesDataCalculated, 
    streamingData,
    jsonError,
    fetchStreamingData
}) => {

    const [withoutSingles, setWithoutSingles] = useState(false);
    const [buttonMessage, setButtonMessage] = useState('Loading streaming data');
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if (buttonMessage === 'No singles' || !singlesDataCalculated) {
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
        } else if (albumHasSingles) {
            setDisableButton(false);
            setButtonMessage('Show without singles');
        }
    }, [singlesDataCalculated]);

    const SongCards = albumData.map((song, index) => {

        let trackLength = '';
        trackLength += Math.floor(song.duration_ms / 60000);
        trackLength += ':';
        trackLength += Math.floor((song.duration_ms % 60000) / 1000);
        if (trackLength.length === 3) trackLength = trackLength.slice(0, 2) + '0' + trackLength.substring(2);

        let songIsLiked = false;

        if (previouslyLikedSongs) {
            songIsLiked = previouslyLikedSongs.some(likedSong => likedSong.trackID === song.id);
        }

        let specialCase;

        if (!loadingStreamingData) {
            if (totalStreams == streamingData[index]) {
                specialCase = 'Highest';
            } else if (lowestStreams == streamingData[index]) {
                specialCase = 'Lowest';
            } 
        }


        let songIsASingle = false;
        let specialCaseWithoutSingles;

        if (albumHasSingles && !loadingStreamingData) {
            if (lowestStreamsWithoutSingles == streamingData[index]) {
                specialCaseWithoutSingles = 'lowestWithoutSingles';
            } else if (totalStreamsWithoutSingles == streamingData[index]) {
                specialCaseWithoutSingles = 'highestWithoutSingles';
            }

            if (singlesByArtist.includes(song.name)) {
                songIsASingle = true;
            }
        }

        let percentSkipped;
        let percentSkippedWithoutSingles;

        if (!loadingStreamingData) {
            percentSkipped = ((1 - ((parseInt(streamingData[index]) / totalStreams))) * 100).toFixed(1);
            percentSkippedWithoutSingles = ((1 - ((parseInt(streamingData[index]) / totalStreamsWithoutSingles))) * 100).toFixed(1);
        }

        return (
            <SongCard 
                key={index}
                index={index}
                loadingStreamingData={loadingStreamingData}
                trackID={song.id}
                trackNumber={song.track_number}
                trackName={song.name}
                numberOfStreams={streamingData[index]}
                trackLength={trackLength}
                trackArtists={song.artists}
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
                {jsonError && 
                    <div className="json-error">
                        <h2 className="json-error-heading">Oh snap!</h2>
                        <p className="json-error-sub-heading">Something went wrong while we were fetching this albums streaming data.</p>
                        <button
                            onClick={fetchStreamingData}
                        >Try again?</button>
                    </div>
                }
            </div>
            {SongCards}
        </div>
    )
}

export default SongContainer;