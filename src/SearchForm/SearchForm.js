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
    }


    return (
            <form 
                onSubmit={handleSubmit}
            >
                <input 
                    placeholder="Search for Artists" 
                    value={artistInput} 
                    onChange={handleChange} 
                />
                <button>Search</button>
            </form>
    )
}

export default SearchForm;