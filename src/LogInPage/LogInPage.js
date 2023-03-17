import React, { useState } from "react";
import './LogInPage.css';

const LogInPage = ({ loginUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async e => {

        e.preventDefault();

        try {

            const loginBody = { username, password };

            const attempt = await fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                body: JSON.stringify(loginBody),
                headers: {
                    "Content-Type": "application/JSON"
                },
                credentials: 'include'
            });
    
            if (!attempt.ok) {
                throw new Error ('Login failed');
            }

            const loginInfo = await attempt.json();

            loginUser(loginInfo);

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