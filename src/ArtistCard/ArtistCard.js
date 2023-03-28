import React from "react";
import { useHistory } from "react-router-dom";
import './ArtistCard.css';

const ArtistCard = ({ artistName, artistImage, artistID }) => {

    const history = useHistory();

    return (
        <div 
            className="artist-card" 
            onClick={() => history.push(`/artist/${artistID}`)}
        >
            <div className="artist-content-box">
                <img className="artist-thumbnail" src={artistImage}/>
                <div className="artist-name-box">
                    <h2 className="artist-name">{artistName}</h2>
                </div>
                <p className="artist-tag">Artist</p>
            </div>
        </div>
    )
}

export default ArtistCard;