import React from "react";
import './AlbumContainer.css'

import AlbumCard from "../AlbumCard/AlbumCard";

const AlbumContainer = ({ albumData }) => {

    const albumCards = albumData.map(album => {
        return (
            
        )
    })

    return (
        <h3>-- Albums go here --</h3>
    )
}

export default AlbumContainer;