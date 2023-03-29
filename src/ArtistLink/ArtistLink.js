import React from "react";
import { useHistory } from "react-router-dom";
import './ArtistLink.css';

const ArtistLink = ({ artistName, artistID }) => {

    const history = useHistory();
    
    return (
        <span 
            onClick={() => history.push(`/artist/${artistID}`)}
            className="artist-link"
        >{artistName}</span>
    )
}

export default ArtistLink;