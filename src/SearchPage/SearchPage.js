import React from "react";
import './SearchPage.css';

const SearchPage = ({ searchTerm}) => {
    return (
        <React.Fragment>
            <h1>-- This is where the Search Page will go --</h1>
            <p>Search Term: {searchTerm}</p>
        </React.Fragment>
    )
}

export default SearchPage;