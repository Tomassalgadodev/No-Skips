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

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.artistInput)
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Search for Artists" value={this.state.artistInput} onChange={this.handleChange} />
                    <button>Search</button>
                </form>
        )
    }
}

export default SearchForm;