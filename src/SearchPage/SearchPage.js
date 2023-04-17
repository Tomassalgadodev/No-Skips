import React, { useEffect, useState } from "react";
import './SearchPage.css';

import ArtistContainer from "../ArtistContainer/ArtistContainer";
import SearchLoadingPage from "../SearchLoadingPage/SearchLoadingPage";

const SearchPage = ({ searchTerm, searchArtists }) => {

    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    const fetchSearchData = async () => {
        setLoading(true);

        try {
            const artistResults = await searchArtists(searchTerm);
            const artists = artistResults.artists.items;

            if (artists.length === 0) {
                throw new Error('No artists for that search term');
            }

            setSearchResults(artists)
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const getSearchResults = async () => {
        const artistResults = await searchArtists(searchTerm);
        console.log(artistResults.artists.items);
        return artistResults;
    }

    useEffect(() => {
        setLoading(true);
        fetchSearchData();
        getSearchResults();
            
    }, [searchTerm]);


    if (!loading) {
        return (
            <ArtistContainer artistData={searchResults} />
        )
    } else {
        return (
            <SearchLoadingPage />
        )
    }
}
 
export default SearchPage;