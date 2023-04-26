import React, { useState } from "react";
import './SavedAlbumContainer.css';

import SavedAlbumCard from "../SavedAlbumCard/SavedAlbumCard";

import downArrow from '../assets/down-arrow.png';
import upArrow from '../assets/up-arrow.png';

const SavedAlbumContainer = ({ savedAlbums, removeAlbum, saveAlbum, spotifyAccessToken }) => {

    const [dropDownActive, setDropDownActive] = useState(false);
    const [selectedButton, setSelectedButton] = useState()

    console.log(savedAlbums);

    savedAlbums = savedAlbums.slice(0, 10);

    const savedAlbumCards = savedAlbums.map(album => {

        const likedSongs = JSON.parse(album.likedSongs);

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
                previouslyLikedSongs={likedSongs}
                spotifyAccessToken={spotifyAccessToken}
            />
        )
    })



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
                    >No skips</div>
                    <div 
                        className="remove-edit-menu-button"
                    >1 skip</div>
                    <div 
                        className="remove-edit-menu-button"
                    >2 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                    >3 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                    >4 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                    >5 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                    >6 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                    >7 skips</div>
                    <div 
                        className="remove-edit-menu-button"
                    >8 skips</div> 
                    <div 
                        className="remove-edit-menu-button"
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