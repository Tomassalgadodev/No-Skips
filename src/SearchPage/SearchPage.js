import React, { useEffect, useState } from "react";
import './SearchPage.css';

import ArtistContainer from "../ArtistContainer/ArtistContainer";
import SearchLoadingPage from "../SearchLoadingPage/SearchLoadingPage";

const SearchPage = ({ searchTerm }) => {

    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState({});

    const fetchSearchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/api/v1/artistSearchData/${searchTerm}`);

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();

            setSearchResults(data.data.searchV2.artists.items);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchSearchData();
        // fetch(`http://localhost:8000/api/v1/artistSearch/${searchTerm}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setSearchResults(data);
        //         setLoading(false);
        //     });
            
    }, [searchTerm]);


    if (!loading) {
        return (
            <ArtistContainer artistData={searchResults.artists} />
        )
    } else {
        return (
            <SearchLoadingPage />
        )
    }
}
 
export default SearchPage;