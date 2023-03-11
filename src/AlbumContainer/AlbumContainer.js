import React from "react";
import './AlbumContainer.css'

import AlbumCard from "../AlbumCard/AlbumCard";

const AlbumContainer = ({ albumData }) => {

    const albumCards = albumData.map((album, index) => {
        return (
            <AlbumCard 
                albumArt={album.albumArt}
                albumTitle={album.albumTitle}
                yearReleased={album.yearReleased}
                link={album.link}
                key={index}
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