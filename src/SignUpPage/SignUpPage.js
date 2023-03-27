import React, { useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import './SignUpPage.css';

import logo from '../assets/anthology-logo.png';

const SignUpPage = ({ loggedIn, loginUser }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    const history = useHistory();

    if (loggedIn) {
        return (
            <Redirect to='/' />
        )
    }

    const confirmPasswordMatch = e => {
        if (e.target.name === 'password') {
            setPassword(e.target.value);
            setPasswordMatch(e.target.value === passwordConfirm);
        } else {
            setPasswordConfirm(e.target.value);
            setPasswordMatch(e.target.value === password);
        }
    }

    const createNewUser = async e => {
        e.preventDefault();

        if (!passwordMatch) {
            // Show the user a message that they must match in the form
            console.log('Passwords must match');
            return;
        }

        try {

            const signupBody = {
                username,
                password,
                firstname: firstName,
                lastname: lastName,
                email
            };

            const attempt = await fetch('http://localhost:8000/api/v1/users', {
                method: 'POST',
                body: JSON.stringify(signupBody),
                headers: {
                    "Content-Type": "application/JSON"
                },
                credentials: 'include'
            });
    
            if (!attempt.ok) {
                throw new Error (attempt.status);
            }

            const attemptMessage = await attempt.json();

            console.log(attemptMessage);

// Same code as in login function from LogInPage Component. Refactor later to have this function declared in App component and pass down as props to both SignUpPage and LogInPage

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
                    throw new Error (attempt);
                }

                const loginInfo = await attempt.json();

                loginUser(loginInfo);

                history.push('/');

            } catch (err) {
                // Show message on page that user failed their login
                console.log(err);
            }
            
        } catch (err) {
            if (err.message === '409') {
                // Show message on page that user failed their login
                console.error('Error: That username already exists. Please choose another');
            }
        }
        
    }

    return (
        <form onSubmit={createNewUser} className="sign-up-form">
            <div className="sign-up-heading-container">
                <img className="sign-up-logo" src={logo} />
                <p className="sign-up-heading">Anthology</p>
            </div>
            <h2 className="sign-up-sub-heading">Sign up for free to start discovering.</h2>
            <div className="input-container">
                <p className="input-label">What's your first name?</p>
                <input className="input" placeholder="Enter your first name." value={firstName} onChange={e => setFirstName(e.target.value)} required/>
            </div>
            <div className="input-container">
                <p className="input-label">What's your last name?</p>
                <input className="input" placeholder="Enter your last name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
            </div>
            <div className="input-container">
                <p className="input-label">What's your email?</p>
                <input className="input" placeholder="Enter your email." value={email} onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="input-container">
                <p className="input-label">What should we call you?</p>
                <input className="input" placeholder="Enter a profile name." value={username} onChange={e => setUsername(e.target.value)} required/>
                <p className="sign-up-error">* This username is already connected to an account. <NavLink className="login-redirect-error" to="login">Log in</NavLink></p>
            </div>
            <div className="input-container">
                <p className="input-label">Create a password.</p>
                <input className="input" placeholder="Create a password." value={password} name='password' onChange={confirmPasswordMatch} required/>
            </div>
            <div className="input-container">
                <p className="input-label">Confirm your password.</p>
                <input className="input" placeholder="Enter your password again." value={passwordConfirm} onChange={confirmPasswordMatch} required/>
            </div>
            <button className="sign-up-form-button">Sign up</button>
            <p className="sign-up-footer">Have an account? <NavLink className="login-redirect" to="/login">Log in</NavLink>.</p>
        </form>
    )
}

export default SignUpPage;