import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './SearchForm.css';

const SearchForm = () => {

    const [ artistInput, setArtist ] = useState('');
    
    const history = useHistory();

    const handleChange = e => {
        setArtist(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search/${artistInput}`);
        setArtist('');
    }


    return (
            <form 
                onSubmit={handleSubmit}
                className="search-form"
            >
                <input
                    className="search-bar"
                    placeholder="Search for Artists" 
                    value={artistInput} 
                    onChange={handleChange} 
                    required
                />
                {/* <button>Search</button> */}
            </form>
    )
}

export default SearchForm;