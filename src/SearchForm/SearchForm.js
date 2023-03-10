import React, { Component } from "react";
import './SearchForm.css';

class SearchForm extends Component {

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
                <form>
                    <input placeholder="Search for Artists" value={this.state.artistInput} onChange={this.handleChange} />
                    <button>Search</button>
                </form>
        )
    }
}

export default SearchForm;