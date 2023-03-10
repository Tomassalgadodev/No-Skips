import React from "react";
import './ArtistCard.css';

const ArtistCard = ({ artistName, artistImage, artistLink }) => {
    return (
        <div className="artist-card" id={artistLink}>
            <img className="artist-thumbnail" src={artistImage}/>
            <h2>{artistName}</h2>
        </div>
    )
}

export default ArtistCard;