import React from "react";
import './ArtistContainer.css';

import ArtistCard from "../ArtistCard/ArtistCard";
import noArtist from '../assets/noArtist.png';

const ArtistContainer = ({ artistData }) => {

    const artistCards = artistData.map((dataPoint, index) => {

        let avatarImage;

        if (dataPoint.images.length > 0) {
            avatarImage = dataPoint.images[0].url;
        } else {
            avatarImage = noArtist;
        }

        return (
            <ArtistCard 
                artistImage={avatarImage}
                artistName={dataPoint.name}
                artistID={dataPoint.id}
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