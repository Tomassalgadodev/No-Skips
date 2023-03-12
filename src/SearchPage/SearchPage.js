import React, { useEffect, useState } from "react";
import './SearchPage.css';

import artistData from "../artistData";

import ArtistContainer from "../ArtistContainer/ArtistContainer";

const SearchPage = ({ searchTerm }) => {

    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/artistSearch/${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data);
                setLoading(false);
            });
    }, []);


    return (
        <React.Fragment>
            <h1>-- This is where the Search Page will go --</h1>
            <p>Search Term: {searchTerm}</p>
            <ArtistContainer artistData={artistData} />
        </React.Fragment>
    )
}
 
export default SearchPage;