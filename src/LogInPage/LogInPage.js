import React, { useState } from "react";
import './LogInPage.css';

const LogInPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="log-in-form">
            <h2>Welcome back!</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
            <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <button>Log In</button>
        </form>
    )
}

export default LogInPage;