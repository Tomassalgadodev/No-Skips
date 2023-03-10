import React from "react";
import './SearchPage.css';

import artistData from "../artistData";

import ArtistContainer from "../ArtistContainer/ArtistContainer";

const SearchPage = ({ searchTerm}) => {
    return (
        <React.Fragment>
            <h1>-- This is where the Search Page will go --</h1>
            <p>Search Term: {searchTerm}</p>
            <ArtistContainer artistData={artistData} />
        </React.Fragment>
    )
}

export default SearchPage;