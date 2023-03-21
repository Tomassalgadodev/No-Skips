import React from "react";
import './AlbumContainer.css'

import AlbumCard from "../AlbumCard/AlbumCard";

const AlbumContainer = ({ albumData, artistID, artistName, likedAlbums }) => {

    const albumCards = albumData.map((album, index) => {

        const isLiked = likedAlbums.find(likedAlbum => likedAlbum.link === album.link);

        return (
            <AlbumCard 
                albumArt={album.albumArt}
                albumTitle={album.albumTitle}
                yearReleased={album.yearReleased}
                link={album.link}
                key={index}
                isLiked={isLiked ? true : false}
                artistName={artistName}
                artistID={artistID}
            />
        )
    })

    return (
        <div>
            {albumCards}
        </div>
    )
}

export default AlbumContainer;