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


    if (!loading) {
        return (
            <ArtistContainer artistData={searchResults.artists} />
        )
    } else {
        return (
            <h2>-- LOADING --</h2>
        )
    }
}
 
export default SearchPage;