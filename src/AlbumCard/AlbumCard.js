import React from "react";
import './AlbumCard.css';

const AlbumCard = ({ albumArt, albumTitle, yearReleased, link }) => {
    return (
        <div id={link}>
            <img src={albumArt} />
            <h2>{albumTitle}</h2>
            <p>{yearReleased}</p>
        </div>
    )
}

export default AlbumCard;