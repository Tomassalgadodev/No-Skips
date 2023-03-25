import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './SearchForm.css';

import magnifyingGlass from '../assets/magnifying-glass-icon.png';

const SearchForm = () => {

    const [ artistInput, setArtist ] = useState('');
    
    const history = useHistory();

    const handleChange = e => {
        setArtist(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search/${artistInput}`);
        // setArtist('');
    }


    return (
        // <div className="form-container">
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
                <img className="magnifying-glass-icon" src={magnifyingGlass} />
            </form>
        // </div>
    )
}

export default SearchForm;