import React from "react";
import './ArtistPage.css';
import albumData from "../albumData";

import AlbumContainer from "../AlbumContainer/AlbumContainer";

const ArtistPage = ({ artistID }) => {
    return (
        <div>
            <h2>-- This is where the Artist page will go --</h2>
            <p>Artist ID: {artistID}</p>
            <AlbumContainer />
        </div>
    )
}

export default ArtistPage;