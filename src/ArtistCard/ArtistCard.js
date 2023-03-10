import React from "react";
import { useHistory } from "react-router-dom";
import './ArtistCard.css';

const ArtistCard = ({ artistName, artistImage, artistLink, artistID }) => {

    const history = useHistory();

    return (
        <div 
            className="artist-card" 
            id={artistLink}
            onClick={() => history.push(`/artist/${artistID}`)}
        >
            <img className="artist-thumbnail" src={artistImage}/>
            <h2>{artistName}</h2>
        </div>
    )
}

export default ArtistCard;