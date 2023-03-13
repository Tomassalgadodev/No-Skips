import React from "react";
import './Header.css';

import SearchForm from "../SearchForm/SearchForm";
import { useHistory } from "react-router-dom";

const Header = () => {
    const history = useHistory();

    return (
        <header>
            <h1 className="home-button" onClick={() => history.push('/')}>No Skips</h1>
            <SearchForm />
            <button onClick={() => history.push('/signup')}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Log In</button>
        </header>
    )
}

export default Header;