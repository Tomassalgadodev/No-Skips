import React from "react";
import './ArtistContainer.css';

import ArtistCard from "../ArtistCard/ArtistCard";
import noArtist from '../assets/noArtist.png';

const ArtistContainer = ({ artistData }) => {

    const artistCards = artistData.map((dataPoint, index) => {

        const artistID = dataPoint.data.uri.split(':').pop();
        const avatarImage = dataPoint.data.visuals.avatarImage

        return (
            <ArtistCard 
                artistImage={avatarImage ? avatarImage.sources[0].url : noArtist}
                artistName={dataPoint.data.profile.name}
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