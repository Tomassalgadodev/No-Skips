import React from "react";
import './AlbumContainer.css'

import AlbumCard from "../AlbumCard/AlbumCard";

const AlbumContainer = ({ heading, albumData, artistID, artistName, likedAlbums, saveAlbum, removeAlbum }) => {

    const albumCards = albumData.items.map((album, index) => {

        const albumLink = `https://open.spotify.com/album/${album.releases.items[0].id}`;

        const isLiked = likedAlbums.find(likedAlbum => likedAlbum.link === albumLink);

        return (
            <AlbumCard 
                albumArt={album.releases.items[0].coverArt.sources[0].url}
                albumTitle={album.releases.items[0].name}
                yearReleased={album.releases.items[0].date.year}
                link={albumLink}
                key={index}
                isLiked={isLiked ? true : false}
                artistName={artistName}
                artistID={artistID}
                saveAlbum={saveAlbum}
                removeAlbum={removeAlbum}
            />
        )
    })

    return (
        <div className="dashboard-container">
            <h1 className="heading">{heading}</h1>
            <div className="saved-album-container">
                {albumCards}
            </div>
        </div>
    )
}

export default AlbumContainer;