import React from "react";
import './AlbumContainer.css'

import AlbumCard from "../AlbumCard/AlbumCard";
import { useHistory } from "react-router-dom";

const AlbumContainer = ({ heading, albumData, artistID, artistName, likedAlbums, saveAlbum, removeAlbum, discography }) => {

    const history = useHistory();

    albumData = albumData.slice(0, 5);

    const albumCards = albumData.map((album, index) => {
    
            const albumLink = `https://open.spotify.com/album/${album.id}`;
    
            const isLiked = likedAlbums.find(likedAlbum => likedAlbum.link === albumLink);
    
            return (
                <AlbumCard 
                    albumArt={album.images[0].url}
                    albumTitle={album.name}
                    yearReleased={album.release_date.substring(0, 4)}
                    link={albumLink}
                    key={index}
                    isLiked={isLiked ? true : false}
                    artistName={artistName}
                    artistID={artistID}
                    saveAlbum={saveAlbum}
                    removeAlbum={removeAlbum}
                    albumID={album.id}
                />
            )
        });

    return (
        <div className="dashboard-container">
            <h1 className="heading">{heading}</h1>
            {heading === 'Albums' && !discography &&
                <button 
                    className="see-discography"
                    onClick={() => history.push(`/albums/${artistName}/${artistID}`)}
                >See all albums</button>}
            {heading === 'Singles and EPs' && 
                <button 
                    className="see-discography"
                    onClick={() => history.push(`/singles/${artistName}/${artistID}`)}
                >See all singles</button>}
            <div className="saved-album-container">
                {albumCards}
            </div>
        </div>
    )
}

export default AlbumContainer;