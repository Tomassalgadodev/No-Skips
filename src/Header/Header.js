import React from "react";
import './Header.css';

import SearchForm from "../SearchForm/SearchForm";

const Header = () => {

        return (
            <header>
                <h1>No Skips</h1>
                <SearchForm />
                <button>Sign Up</button>
                <button>Log In</button>
            </header>
        )
}

export default Header;