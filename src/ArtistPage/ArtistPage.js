import React from "react";
import './ArtistPage.css';
import albumData from "../albumData";
import singleArtistData from "../singleArtistData";

import AlbumContainer from "../AlbumContainer/AlbumContainer";

const artistImage = singleArtistData.artistImage.substring(23, singleArtistData.artistImage.length - 3);

const ArtistPage = ({ artistID }) => {
    return (
        <div>
            <div 
                className="artist-heading"
                style={{backgroundImage: `url(${artistImage})`}}
            >
                <h2>{singleArtistData.artistName}</h2>
                <p>Artist ID: {artistID}</p>
                {/* <img className="artist-image" src={artistImage}/> */}
            </div>
            <AlbumContainer albumData={albumData} />
        </div>
    )
}

export default ArtistPage;