import React from "react";
import './ArtistPage.css';
import albumData from "../albumData";

const ArtistPage = ({ artistID }) => {
    return (
        <div>
            <h2>-- This is where the Artist page will go --</h2>
            <p>Artist ID: {artistID}</p>
        </div>
    )
}

export default ArtistPage;