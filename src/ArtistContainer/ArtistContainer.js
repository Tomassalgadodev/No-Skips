import React from "react";
import './ArtistContainer.css';

import ArtistCard from "../ArtistCard/ArtistCard";
import noArtist from '../assets/noArtist.png';

const ArtistContainer = ({ artistData }) => {

    const artistCards = artistData.map((dataPoint, index) => {

        const artistID = dataPoint.artistLink.split('/').pop();

        return (
            <ArtistCard 
                artistImage={dataPoint.artistImage === 'No Image' ? noArtist : dataPoint.artistImage}
                artistName={dataPoint.artistName}
                artistLink={dataPoint.artistLink}
                artistID={artistID}
                key={index}
            />
        )
    })

    return (
        <div className="artist-container">
            {artistCards}
        </div>
    )
}

export default ArtistContainer;