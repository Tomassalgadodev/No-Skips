import React, { useState } from "react";
import './LogInPage.css';

const LogInPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async e => {

        e.preventDefault();

        try {

            const loginInfo = { username, password };

            const attempt = await fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/JSON"
                }
            });
    
            if (!attempt.ok) {
                throw new Error ('Login failed');
            }

            const loginSuccess = await attempt.json();

            console.log(loginSuccess);

        } catch (err) {
            // Show message on page that user failed their login
            console.log(err);
        }
    }

    return (
        <form className="log-in-form" onSubmit={login}>
            <h2>Welcome back!</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
            <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <button>Log In</button>
        </form>
    )
}

export default LogInPage;