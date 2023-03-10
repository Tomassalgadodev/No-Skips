import React, { Component } from "react";
import './Header.css';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            artistInput: ''
        }
    }

    handleChange = e => {
        this.setState({
            artistInput: e.target.value
        })
    }

    render() {
        return (
            <header>
                <h1>No Skips</h1>
                <form>
                    <input placeholder="Search for Artists" value={this.state.artistInput} onChange={this.handleChange} />
                    <button>Search</button>
                </form>
                <button>Sign Up</button>
                <button>Log In</button>
            </header>
        )
    }
}

export default Header;