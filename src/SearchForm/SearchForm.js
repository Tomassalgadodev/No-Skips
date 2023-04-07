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
    }


    return (
            <form 
                onSubmit={handleSubmit}
                className="search-form"
            >
                <input
                    className="search-bar"
                    placeholder="Search for Artists" 
                    spellCheck="false"
                    value={artistInput} 
                    onChange={handleChange} 
                    required
                />
                <img className="magnifying-glass-icon" src={magnifyingGlass} />
            </form>
    )
}

export default SearchForm;