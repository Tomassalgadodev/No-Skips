import React, { useEffect, useState } from "react";
import './SavedAlbumContainer.css';

import SavedAlbumCard from "../SavedAlbumCard/SavedAlbumCard";

import downArrow from '../assets/down-arrow.png';
import upArrow from '../assets/up-arrow.png';

const SavedAlbumContainer = ({ savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken }) => {

    const [dropDownActive, setDropDownActive] = useState(false);
    const [selectedButton, setSelectedButton] = useState(0);

    savedAlbums = savedAlbums.map(album => {
        if (typeof album.likedSongs === 'string') {
            album.likedSongs = JSON.parse(album.likedSongs);
            album.skips = album.numberOfSongs - album.likedSongs.length;
            album.skipRate = album.likedSongs.length / album.numberOfSongs;
        }
        return album;
    });

    if (selectedButton === 9) {
        savedAlbums = savedAlbums.filter(album => album.skips >= 9);
    } else {
        savedAlbums = savedAlbums.filter(album => album.skips === selectedButton);
    }

    if (selectedButton === 0) {
        savedAlbums = savedAlbums.sort((a, b) => b.numberOfSongs - a.numberOfSongs);
    } else {
        savedAlbums = savedAlbums.sort((a, b) => b.skipRate - a.skipRate);
    }

    const savedAlbumCards = savedAlbums.map(album => {

        return (
            <SavedAlbumCard 
                albumArt={album.albumArt}
                albumTitle={album.albumTitle}
                yearReleased={album.yearReleased}
                link={album.link}
                key={album.link}
                artistName={album.artistName}
                removeAlbum={removeAlbum}
                artistID={album.artistID}
                albumID={album.albumID}
                saveAlbum={saveAlbum}
                previouslyLikedSongs={album.likedSongs}
                spotifyAccessToken={spotifyAccessToken}
                numberOfSongs={album.numberOfSongs}
            />
        )
    });

    const setSelectedSkipRate = (skipRate) => {
        setSelectedButton(skipRate);
        setDropDownActive(false);
    }

    return (
        <div className="dashboard-container">
            <h1 className="heading">Your albums</h1>
            <div 
                className="sort-button"
                onClick={() => setDropDownActive(!dropDownActive)}
            >Sort <img className="arrow-icon" src={dropDownActive ? upArrow : downArrow}/></div>
            {dropDownActive &&
                <div 
                    className="skips-dropdown"
                >
                    <div 
                        className="skips-dropdown-button"
                        style={selectedButton === 0 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(0)}
                    >No skips</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 1 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(1)}
                    >1 skip</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 2 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(2)}
                    >2 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 3 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(3)}
                    >3 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 4 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(4)}
                    >4 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 5 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(5)}
                    >5 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 6 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(6)}
                    >6 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 7 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(7)}
                    >7 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 8 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(8)}
                    >8 skips</div> 
                    <div 
                        className="remove-edit-menu-button"
                        style={selectedButton === 9 ? { backgroundColor: 'hsla(0,0%,100%,.1)' } : { backgroundColor: 'none' }}
                        onClick={() => setSelectedSkipRate(9)}
                    >9+ skips</div>                                                                               
                </div>
                }
            <div className="saved-album-container">
                {savedAlbumCards}
            </div>
        </div>
    )
}

export default SavedAlbumContainer;