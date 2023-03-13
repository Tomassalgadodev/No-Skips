import React from "react";
import './LogInPage.css';

const LogInPage = () => {
    return (
        <form className="log-in-form">
            <h2>Welcome back!</h2>
            <input placeholder="Username" required/>
            <input placeholder="Password" required/>
            <button>Log In</button>
        </form>
    )
}

export default LogInPage;