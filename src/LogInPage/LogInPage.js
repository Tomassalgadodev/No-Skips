import React from "react";
import './LogInPage.css';

const LogInPage = () => {
    return (
        <form className="log-in-form">
            <input placeholder="Username"/>
            <input placeholder="Password"/>
            <button>Log In</button>
        </form>
    )
}

export default LogInPage;