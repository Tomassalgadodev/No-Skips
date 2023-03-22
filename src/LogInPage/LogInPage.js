import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import './LogInPage.css';

const LogInPage = ({ loginUser, loggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    useEffect(() => {
        return () => {
            console.log('it does mount');            
        }
      }, []);

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
                throw new Error (attempt.status);
            }

            const loginInfo = await attempt.json();

            loginUser(loginInfo);

            history.push('/');

        } catch (err) {
            // Show message on page that user failed their login
            console.log(err);
        }
    }

    if (loggedIn) {
        return (
            <Redirect to='/' />
        )
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