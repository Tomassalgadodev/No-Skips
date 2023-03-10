import React from "react";
import './Header.css';

const Header = () => {
    return (
        <header>
            <h1>No Skips</h1>
            <form>
                <input placeholder="Search for Artists" />
                <button>Search</button>
            </form>
            <button>Sign Up</button>
            <button>Log In</button>
        </header>
    )
}

export default Header;